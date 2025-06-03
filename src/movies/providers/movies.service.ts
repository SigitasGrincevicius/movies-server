import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from '../movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenresService } from 'src/genres/providers/genres.service';
import { PatchMovieDto } from '../dtos/patch-movie.dto';
import { Genre } from 'src/genres/genre.entity';
import { GetMoviesDto } from '../dtos/get-movies.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { ERROR_MESSAGES } from '../constants/error-messages.constants';
import { CreateMovieProvider } from './create-movie.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class MoviesService {
  constructor(
    /**
     * Inject UsersService
     */
    private readonly usersService: UsersService,
    /**
     * Inject moviesRepository
     */
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    /**
     * Inject GenresService
     */
    private readonly genresService: GenresService,
    /**
     *  Inject PaginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Inject createMoviesProvider
     */
    private readonly createMovieProvider: CreateMovieProvider,
  ) {}

  private readonly logger = new Logger(MoviesService.name);

  private async validateGenres(genreIds: string[]): Promise<Genre[]> {
    const genres = await this.genresService.findMultipleGenres(genreIds);

    if (genres.length !== genreIds.length) {
      throw new NotFoundException(ERROR_MESSAGES.GENRES_NOT_FOUND);
    }
    return genres;
  }

  private async findMovieById(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!movie) {
      throw new NotFoundException(ERROR_MESSAGES.MOVIE_NOT_FOUND(id));
    }
    return movie;
  }

  public async findAll(
    movieQuery: GetMoviesDto,
    userId: string,
  ): Promise<Paginated<Movie>> {
    this.logger.debug(`Starting findAll method with data, userId: ${userId}`);

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND(userId));
    }

    try {
      const { page = 1, limit = 10 } = movieQuery;
      return await this.paginationProvider.paginateQuery(
        { page, limit },
        this.moviesRepository,
      );
    } catch (error) {
      this.logger.error('Error retrieving movies:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }

  public async create(
    createMovieDto: CreateMovieDto,
    user: ActiveUserData,
  ): Promise<Movie> {
    return await this.createMovieProvider.create(createMovieDto, user);
  }

  public async delete(id: string): Promise<Movie> {
    this.logger.debug(`Starting delete method with data, id: ${id}`);

    const movie = await this.findMovieById(id);

    if (!movie) {
      this.logger.error(`Movie with ID ${id} not found during delete`);
      throw new NotFoundException(ERROR_MESSAGES.MOVIE_NOT_FOUND(id));
    }
    try {
      await this.moviesRepository.delete(id);
    } catch (error) {
      this.logger.error('Error while deleting the movie:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
    return movie;
  }

  /**
   * Updates an existing movie by ID.
   * @param id - The ID of the movie to update.
   * @param patchMovieDto - The data to update.
   * @returns The updated movie.
   * @throws NotFoundException if the movie does not exist.
   * @throws InternalServerErrorException if the update fails.
   */
  public async update(patchMovieDto: PatchMovieDto): Promise<Movie> {
    const { id } = patchMovieDto;
    this.logger.debug(`Starting update method for movie ID: ${id}`);

    const movie = await this.findMovieById(id);

    if (!movie) {
      this.logger.error(`Movie with ID ${id} not found during update`);
      throw new NotFoundException(ERROR_MESSAGES.MOVIE_NOT_FOUND(id));
    }

    // If genres are being updated, validate them
    if (patchMovieDto.genres) {
      movie.genres = await this.validateGenres(patchMovieDto.genres);
    }

    // Update other fields
    Object.assign(movie, patchMovieDto);

    try {
      return await this.moviesRepository.save(movie);
    } catch (error) {
      this.logger.error('Error while updating the movie:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }

  public async findOneById(movieId: string) {
    try {
      return await this.moviesRepository.findOne({ where: { id: movieId } });
    } catch (error) {
      this.logger.error('Error while fetching the movie:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }
}
