import { IsNotEmpty } from 'class-validator';

export class SensorCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  macAddress: string;

  @IsNotEmpty()
  password: string;
}
