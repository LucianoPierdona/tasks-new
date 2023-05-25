import { Type } from 'class-transformer';
import {
  IsDecimal,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';

export class PaginationReqDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;
}

export class PaginationRespDto<T> {
  @IsDefined()
  @IsNumber()
  limit: number;

  @IsDefined()
  @IsNumber()
  offset: number;

  @IsDefined()
  @IsNumber()
  total: number;

  @IsObject()
  @IsDefined()
  data: T;
}
