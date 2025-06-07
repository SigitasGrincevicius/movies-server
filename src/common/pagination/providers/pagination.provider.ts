import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';

/**
 * Service providing pagination utilities for repositories.
 * Builds paginated responses with metadata and navigation links.
 *
 * @export
 * @class PaginationProvider
 */
@Injectable()
export class PaginationProvider {
  /**
   * Injects the current HTTP request to build pagination links.
   * @param request The current Express request object.
   */
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * Paginates a query on the given repository and returns a paginated response.
   *
   * @param paginationQuery The pagination options (page, limit).
   * @param repository The TypeORM repository to paginate.
   * @returns {Promise<Paginated<T>>} A paginated response with metadata and navigation links.
   */
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    queryBuilder?: SelectQueryBuilder<T>,
  ): Promise<Paginated<T>> {
    const { page = 1, limit = 10 } = paginationQuery;

    let results: T[];
    let totalItems: number;

    if (queryBuilder) {
      // Use QueryBuilder for pagination
      results = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      totalItems = await queryBuilder.getCount();
    } else {
      // Use repository for pagination
      [results, totalItems] = await repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    /**
     * Calculating pagination metadata
     */
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    // Determine next and previous page numbers
    const nextPage = page === totalPages ? page : page + 1;
    const previousPage = page === 1 ? 1 : page - 1;

    const baseURL = `${this.request.protocol}://${this.request.headers.host}`;

    /**
     * Helper to build a page link for a given page number.
     * @param p The page number.
     * @returns The full URL for the requested page.
     */
    const buildPageLink = (p: number) => {
      const url = new URL(this.request.originalUrl, baseURL);
      url.searchParams.set('limit', limit.toString());
      url.searchParams.set('page', p.toString());
      return url.toString();
    };

    /**
     * Build the final paginated response object.
     */
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
