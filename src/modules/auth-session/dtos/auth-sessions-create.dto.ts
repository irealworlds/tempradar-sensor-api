import { IsNotEmpty } from 'class-validator';

export class AuthSessionsCreateDto {
  @IsNotEmpty()
  macAddress: string;

  @IsNotEmpty()
  password: string;
}
