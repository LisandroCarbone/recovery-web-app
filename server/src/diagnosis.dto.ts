import { IsString, IsEmail, IsNotEmpty, IsIn, Min, Max, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateDiagnosisDto {
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  dni?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  gym?: string;

  @IsString()
  @IsIn(['Recovery Total', 'Full Relax', 'Botas Compresión', 'Masajista'])
  service: string;

  @IsString()
  @IsOptional()
  painZone?: string;

  // Optional because they are added in the last step
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bookingDate?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bookingTime?: string;
}
