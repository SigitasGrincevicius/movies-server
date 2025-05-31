export const ERROR_MESSAGES = {
  DATABASE_CONNECTION: 'A database error occurred. Please try again later.',
  MOVIE_NOT_FOUND: (id: string) => `The movie with ID '${id}' was not found.`,
  USER_NOT_FOUND: (id: string) => `The user with ID '${id}' was not found.`,
  GENRES_NOT_FOUND: 'One or more genres were not found for the provided IDs.',
};
