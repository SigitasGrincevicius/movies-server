import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  /**
   * The maximum number of items to return per page.
   * Must be a positive number and cabbot exceed 200.
   */
  @IsOptional()
  @IsPositive()
  @Max(200)
  limit?: number = 10;

  /**
   * The page number to retrieve.
   * Must be positive number and cannot exceed 1000.
   */
  @IsOptional()
  @IsPositive()
  @Max(1000)
  page?: number = 1;
}
