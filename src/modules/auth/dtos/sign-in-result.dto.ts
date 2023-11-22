import { ApiProperty } from '@nestjs/swagger';

export class SignInResultDto {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  accessToken: string;
}
