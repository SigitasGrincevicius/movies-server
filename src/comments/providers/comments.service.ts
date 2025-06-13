import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';
import { MoviesService } from 'src/movies/providers/movies.service';
import { Repository } from 'typeorm';
import { Comment } from '../comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from 'src/movies/constants/error-messages.constants';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { UserRole } from 'src/users/enums/user-role.enum';
import { GetCommentsByMovieDto } from '../dtos/get-comments-by-movie.dto';

@Injectable()
export class CommentsService {
  constructor(
    /**
     * Inject usersService
     */
    private readonly userService: UsersService,
    /**
     * Inject moviesService
     */
    private readonly moviesService: MoviesService,
    /**
     * Inject commentsRepository
     */
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  private readonly logger = new Logger(CommentsService.name);

  public async createComment(
    createCommentDto: CreateCommentDto,
    userData: ActiveUserData,
  ) {
    this.logger.debug(
      `Creating movie comment, createCommentDto: ${JSON.stringify(createCommentDto)}`,
    );
    const { text, movieId } = createCommentDto;
    const { sub } = userData;
    let user;
    let movie;

    try {
      user = await this.userService.findOneById(sub);
      movie = await this.moviesService.findOneById(movieId);
    } catch (error) {
      this.logger.error('Error whie getting data from DB:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }

    if (!movie) {
      throw new InternalServerErrorException('Movie not found.');
    }

    const comment = this.commentsRepository.create({
      text,
      createdBy: user,
      movie,
    });
    return await this.commentsRepository.save(comment);
  }

  public async deleteComment(id: string, userData: ActiveUserData) {
    this.logger.debug(`Deleting comment withid: ${id} by user: ${userData}`);
    let comment = await this.findOneById(id);

    // Check if the user is the creator of the comment
    if (
      comment.createdBy.id !== userData.sub &&
      userData.role !== UserRole.Admin
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }

    try {
      await this.commentsRepository.delete(id);
      return { message: 'Comment deleted successfully.' };
    } catch (error) {
      this.logger.error('Error while deleting comment:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }

  public async updateComment(
    id: string,
    updateCommentDto: UpdateCommentDto,
    userData: ActiveUserData,
  ) {
    this.logger.debug(`Update comment with id: ${id} by user: ${userData}`);
    let comment = await this.findOneById(id);

    // Check if the user is the creator of the comment
    if (
      comment.createdBy.id !== userData.sub &&
      userData.role !== UserRole.Admin
    ) {
      throw new ForbiddenException('You are not allowed to edit this comment');
    }

    try {
      comment.text = updateCommentDto.text;
      return await this.commentsRepository.save(comment);
    } catch (error) {
      this.logger.error('Error while updating comment:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }

  public async findOneById(id: string) {
    this.logger.debug(`Find comment with id: ${id}`);
    let comment;

    try {
      comment = await this.commentsRepository.findOne({
        where: { id },
      });
      if (!comment) {
        this.logger.error(`Comment not found, id: ${id}`);
        throw new InternalServerErrorException('Comment not found.');
      }
      return comment;
    } catch (error) {
      this.logger.error('Comment fetch error:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }

  public async findByMovieId(movieId: string) {
    this.logger.debug(`Method findByMovieId started, movieId: ${movieId}`);

    try {
      // Ensure the movie exists
      const movie = this.moviesService.findOneById(movieId);
    } catch (error) {
      this.logger.error(`Error fetching movie, id: ${movieId}`);
      throw new InternalServerErrorException(
        'Could not fetch a movie. Please try again later.',
      );
    }

    try {
      // Find comments for the movie
      const comments = await this.commentsRepository.find({
        where: { movie: { id: movieId } },
        relations: ['createdBy'],
        order: { createdDate: 'DESC' },
      });

      return comments;
    } catch (error) {
      this.logger.error(
        `Error fetching comments for movie, movieId: ${movieId}`,
      );
      throw new InternalServerErrorException(
        'Could not fetch comments for this movie. Please try again later.',
      );
    }
  }
}
