import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { MovieSortBy } from '../enums/movies-sort-by.enum';
import { SortDirection } from '../enums/sort-direction.enum';

class getMoviesBaseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(MovieSortBy)
  sortBy?: MovieSortBy;

  @IsOptional()
  @IsEnum(SortDirection)
  direction?: SortDirection;
}

export class GetMoviesDto extends IntersectionType(
  getMoviesBaseDto,
  PaginationQueryDto,
) {}
