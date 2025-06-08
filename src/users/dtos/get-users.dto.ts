import { IntersectionType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { SortDirection } from 'src/movies/enums/sort-direction.enum';

class getUsersBaseDto {
  @IsOptional()
  @IsEnum(SortDirection)
  direction?: SortDirection;
}

export class GetUsersDto extends IntersectionType(
  getUsersBaseDto,
  PaginationQueryDto,
) {}
