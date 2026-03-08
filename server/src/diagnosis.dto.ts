import { IsString, IsEmail, IsNotEmpty, IsIn, Min, Max, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateDiagnosisDto {
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  gym?: string;

  @IsString()
  @IsIn(['Recovery', 'Wellness', 'Beauty', 'Masajista'])
  service: string;

  @IsString()
  @IsIn(['Nulo', 'Poco', 'Normal', 'Mucho'])
  painZone: string;

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
