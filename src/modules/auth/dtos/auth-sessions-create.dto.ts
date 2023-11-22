import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthSessionsCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  macAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
