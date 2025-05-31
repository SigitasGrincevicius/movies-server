/**
 * Interface for paginated responses.
 * @template T - The type of data being paginated.
 */
export interface Paginated<T> {
  /**
   * The array of items for the current page.
   */
  data: T[];

  /**
   * Metadata abut the pagination.
   */
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  
  /**
   * Links for navigation.
   */
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    previous: string;
  };
}
