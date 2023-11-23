import { IsNumber, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginationOptionsDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Max(100)
  public skip?: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Max(100)
  public limit?: number;
}
