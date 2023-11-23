import { IsNumber, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationOptionsDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Max(100)
  public skip?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Max(100)
  public limit?: number;
}
