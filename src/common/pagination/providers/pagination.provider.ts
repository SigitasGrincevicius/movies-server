import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { Paginated } from '../interfaces/paginated.interface';

/**
 * Service providing pagination utilities for repositories.
 * Builds paginated responses with metadata and navigation links.
 */
@Injectable()
export class PaginationProvider {
  /**
   * Paginates a query on the given repository and returns a paginated response.
   * @param paginationQuery The pagination options (page, limit).
   * @param repository The TypeORM repository to paginate.
   * @param request The current Express request object (for link generation).
   * @param queryBuilder Optional TypeORM query builder to paginate.
   */
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    queryBuilder?: SelectQueryBuilder<T>,
    baseUrl?: string,
    originalUrl?: string,
  ): Promise<Paginated<T>> {
    const { page = 1, limit = 10 } = paginationQuery;

    let results: T[];
    let totalItems: number;

    if (queryBuilder) {
      results = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      totalItems = await queryBuilder.getCount();
    } else {
      [results, totalItems] = await repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const nextPage = page === totalPages ? page : page + 1;
    const previousPage = page === 1 ? 1 : page - 1;

    const buildPageLink = (p: number) => {
      if (!baseUrl || !originalUrl) {
        throw new InternalServerErrorException(
          'baseUrl or originalUrl have incorrect values',
        );
      }
      const url = new URL(originalUrl, baseUrl);
      url.searchParams.set('limit', limit.toString());
      url.searchParams.set('page', p.toString());
      return url.toString();
    };

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems: totalItems,
        currentPage: page,
        totalPages: totalPages,
      },
      links: {
        first: buildPageLink(1),
        last: buildPageLink(totalPages),
        current: buildPageLink(page),
        next: buildPageLink(nextPage),
        previous: buildPageLink(previousPage),
      },
    };

    return finalResponse;
  }
}
