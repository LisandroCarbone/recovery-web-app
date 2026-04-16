import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'SECRET_KEY_123',
      signOptions: { expiresIn: '7d' },
    })
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
