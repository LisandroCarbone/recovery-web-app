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
  @IsIn(['Rugby', 'Fútbol', 'Crossfit', 'Handball', 'Running', 'Powerlifting', 'Basketball', 'Fisicoculturismo', 'Otro'])
  discipline: string;

  @IsNumber()
  @Min(1)
  @Max(7)
  frequency: number;

  @IsString()
  @IsIn(['Nulo', 'Poco', 'Normal', 'Mucho'])
  painZone: string;

  @IsArray()
  @IsString({ each: true })
  interests: string[];

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
