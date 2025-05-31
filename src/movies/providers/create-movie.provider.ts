import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from '../movie.entity';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { ERROR_MESSAGES } from '../constants/error-messages.constants';
import { UsersService } from 'src/users/providers/users.service';
import { Genre } from 'src/genres/genre.entity';
import { GenresService } from 'src/genres/providers/genres.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateMovieProvider {
  private readonly logger = new Logger(CreateMovieProvider.name);

  constructor(
    /**
     * Inject usersService
     */
    private readonly usersService: UsersService,

    /**
     * Inject genresService
     */
    private readonly genresService: GenresService,

    /**
     * Inject moviesRepository
     */
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    /**
     * Inject mailService
     */
    private readonly mailService: MailService,
  ) {}

  private async validateGenres(genreIds: string[]): Promise<Genre[]> {
    const genres = await this.genresService.findMultipleGenres(genreIds);

    if (genres.length !== genreIds.length) {
      throw new NotFoundException(ERROR_MESSAGES.GENRES_NOT_FOUND);
    }
    return genres;
  }

  public async create(
    createMovieDto: CreateMovieDto,
    user: ActiveUserData,
  ): Promise<Movie> {
    this.logger.debug(
      `Creating movie titled '${createMovieDto.title}' by userId: ${user.sub}`,
    );
    const { sub: userId } = user;
    const { genres: genreIds } = createMovieDto;

    const createdBy = await this.usersService.findOneById(userId);

    const genres = await this.validateGenres(genreIds);

    const newMovie = this.moviesRepository.create({
      ...createMovieDto,
      createdBy,
      genres,
    });

    try {
      await this.mailService.sendEmailWithTemplate(
        'user@example.com',
        'Movie Created',
        'welcome', // template filename without .ejs
        {
          username: `${createdBy.firstName} ${createdBy.lastName}`,
          movieTitle: newMovie.title,
        },
      );
      return await this.moviesRepository.save(newMovie);
    } catch (error) {
      this.logger.error('Error while saving the movie:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }
}
