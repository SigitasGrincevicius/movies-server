import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '../favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { MoviesService } from 'src/movies/providers/movies.service'; 
import { Movie } from 'src/movies/movie.entity';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);

  constructor(
    /**
     * Inject favoritesRepository
     */
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    /**
     * Inject moviesService
     */
    private readonly moviesService: MoviesService,
    /**
     * Inject userService
     */
    private readonly usersService: UsersService,
  ) {}

  private async getMovieOrThrow(movieId: string) {
    let movie: Movie | null;
    try {
      movie = await this.moviesService.findOneById(movieId);
      if (!movie) {
        this.logger.warn(`Movie with id ${movieId} not found`);
        throw new NotFoundException(`Movie with id ${movieId} not found`);
      }
      return movie;
    } catch (error) {
      this.logger.error(
        `Error fetching movie with id ${movieId}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch movie with id ${movieId}. Please try again later.',
      );
    }
  }

  private async findUserOrThrow(userId: string) {
    try {
      const user = await this.usersService.findOneById(userId);
      if (!user) {
        this.logger.warn(`User with id ${userId} not found`);
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Error fetching user with id ${userId}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch user. Please try again later.',
      );
    }
  }

  private async findFavorite(movie: Movie, user: User) {
    try {
      return await this.favoritesRepository.findOne({
        where: {
          user: { id: user.id },
          movie: { id: movie.id },
        },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching favorite with movieId ${movie.id} and userId ${user.id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch favorite with movieId ${movieId} and userId ${user.id}.Please try again later.',
      );
    }
  }

  public async addFavorite(movieId: string, userData: ActiveUserData) {
    this.logger.debug(
      `User ${userData.sub} is adding movie ${movieId} to favorites`,
    );
    // Check if movie exists
    const movie = await this.getMovieOrThrow(movieId);
    const user = await this.findUserOrThrow(userData.sub);

    // Check if favorite allready exists
    const existingFavorite = await this.findFavorite(movie, user);
    if (existingFavorite) {
      this.logger.log(
        `Favorite already exists for user ${user.id} and movie ${movieId}`,
      );
      return existingFavorite;
    }

    // Create a new movie and save new favorite
    try {
      const favorite = this.favoritesRepository.create({
        user,
        movie,
      });
      await this.favoritesRepository.save(favorite);
      this.logger.log(
        `Favorite created for user ${user.id} and movie ${movieId}`,
      );
      return favorite;
    } catch (error) {
      this.logger.error(
        `Error saving favorite with movieId ${movie.id} and userId ${user.id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Could not save favorite. Please try again later.`,
      );
    }
  }

  public async deleteFavorite(movieId: string, userId: string) {
    this.logger.debug(
      `User ${userId} is deleting movie ${movieId} from favorites`,
    );
    // Check if movie exists
    const movie = await this.getMovieOrThrow(movieId);
    const user = await this.findUserOrThrow(userId);

    // Check if favorite allready exists
    const existingFavorite = await this.findFavorite(movie, user);
    if (!existingFavorite) {
      this.logger.warn(
        `Favorite does not exist for user ${user.id} and movie ${movieId}`,
      );
      throw new NotFoundException(
        `Favorite not found for user ${user.id} and movie ${movie.id}`,
      );
    }

    // Delete movie from favorites
    try {
      await this.favoritesRepository.remove(existingFavorite);
      this.logger.debug(
        `Favorite deleted for user ${user.id} and movie ${movieId}`,
      );
      return { success: true };
    } catch (error) {
      this.logger.error(
        `Error deleting favorite with movieId ${movie.id} and userId ${user.id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Could not delete favorite. Please try again later.`,
      );
    }
  }

  public async getAllFavorites() {
    try {
      const favorites = await this.favoritesRepository.find();
      return { data: favorites };
    } catch (error) {
      this.logger.error(`Error fetching favorites: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to fetch favorites. Please try again later.',
      );
    }
  }
}
