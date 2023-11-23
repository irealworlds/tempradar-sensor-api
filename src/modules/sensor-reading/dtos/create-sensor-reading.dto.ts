import { IsNumber } from 'class-validator';

export class CreateSensorReadingDto {
  @IsNumber()
  temperature?: number;

  @IsNumber()
  humidity?: number;

  @IsNumber()
  airQuality?: number;
}
