import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class getMoviesBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetMoviesDto extends IntersectionType(
  getMoviesBaseDto,
  PaginationQueryDto,
) {}
