import { ApiProperty } from '@nestjs/swagger';

export class JwtAuthSessionDto {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  accessToken: string;
}
