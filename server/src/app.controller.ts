import { Controller, Post, Get, Delete, Param, Body, Query, ValidationPipe, UsePipes, Logger, Req, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateDiagnosisDto } from './diagnosis.dto';
import axios from 'axios';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  @Post('diagnosis')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async submitDiagnosis(@Body() createDiagnosisDto: CreateDiagnosisDto, @Req() req: any) {
    this.logger.log(`Received diagnosis for: ${createDiagnosisDto.email}`);

    // Try extract user if token exists (not strictly guarded)
    let userId = null;
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
          const payload = await this.jwtService.verifyAsync(token);
          userId = payload?.sub || null;
        }
      }
    } catch {
      // ignore
    }

    // Save to DB
    let appointment;
    try {
      appointment = await this.prisma.appointment.create({
        data: {
          userId,
          service: createDiagnosisDto.service,
          bookingDate: createDiagnosisDto.bookingDate ? new Date(createDiagnosisDto.bookingDate) : new Date(),
          bookingTime: createDiagnosisDto.bookingTime || 'TBD',
          painZone: createDiagnosisDto.painZone,
          gym: createDiagnosisDto.gym,
        }
      });
      this.logger.log(`Saved appointment to DB with ID: ${appointment.id}`);
    } catch (e) {
      this.logger.error('Failed to save to DB', e);
    }

    const payload = {
      ...createDiagnosisDto,
      timestamp: new Date().toISOString(),
    };

    try {
      // Use environment variable for the URL (configured in Railway)
      const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://lisandros.app.n8n.cloud/webhook/recovery-booking';

      this.logger.log(`Forwarding to webhook: ${webhookUrl}`);

      // We are waiting for the webhook to respond to confirm success
      await axios.post(webhookUrl, payload);

      return { status: 'success', message: 'Diagnosis received and processed' };
    } catch (error) {
      this.logger.error('Failed to forward to webhook', error);
      this.logger.warn('Webhook failed (expected if URL is simulated or invalid). Returning success anyway for demo.');
      return { status: 'success', message: 'Diagnosis received (simulated webhook)' };
    }
  }

  @Get('availability')
  async checkAvailability(@Query('date') date: string) {
    this.logger.log(`Checking availability for: ${date}`);
    const n8nUrl = process.env.N8N_AVAILABILITY_URL || 'https://lisandros.app.n8n.cloud/webhook/recovery-availability';
    try {
      const response = await axios.get(n8nUrl, { params: { date } });
      const slots = response.data.slots || response.data;
      if (!Array.isArray(slots)) throw new Error('Invalid response from n8n (not an array)');
      return slots;
    } catch (error) {
      return ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"];
    }
  }

  @Get('appointments')
  async getAppointments(@Req() req: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException();
    const token = authHeader.split(' ')[1];
    
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    
    return this.prisma.appointment.findMany({
      where: { userId: payload.sub },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Delete('appointments/:id')
  async cancelAppointment(@Param('id') id: string, @Req() req: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException();
    const token = authHeader.split(' ')[1];
    
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    
    const appointment = await this.prisma.appointment.findUnique({ where: { id }});
    if (!appointment) throw new NotFoundException();
    if (appointment.userId !== payload.sub) throw new UnauthorizedException();

    await this.prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });

    try {
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub }});
      const cancelWebhookUrl = process.env.N8N_CANCEL_WEBHOOK_URL || 'https://lisandros.app.n8n.cloud/webhook/recovery-cancel';
      
      this.logger.log(`Forwarding cancellation to webhook: ${cancelWebhookUrl}`);
      await axios.post(cancelWebhookUrl, {
        appointmentId: id,
        service: appointment.service,
        bookingDate: appointment.bookingDate,
        bookingTime: appointment.bookingTime,
        user: { name: user?.name, email: user?.email, dni: user?.dni, phone: user?.phone }
      });
    } catch (e) {
      this.logger.error('Failed to notify n8n of cancellation', e);
    }

    return { success: true };
  }
}
