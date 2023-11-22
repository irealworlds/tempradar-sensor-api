import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSensorReadingDto {
  @ApiProperty()
  @IsNumber()
  temperature?: number;

  @ApiProperty()
  @IsNumber()
  humidity?: number;

  @ApiProperty()
  @IsNumber()
  airQuality?: number;
}
