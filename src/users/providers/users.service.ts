import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { Repository } from 'typeorm';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import { GetUsersDto } from '../dtos/get-users.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

/**
 * Class to connect to Users table and perform business operations
 */
import { Logger } from '@nestjs/common';
import { SortDirection } from 'src/movies/enums/sort-direction.enum';
import { ERROR_MESSAGES } from 'src/movies/constants/error-messages.constants';

@Injectable()
export class UsersService {
  /**
   * Constructs the UsersService with required dependencies
   * @param authService - The authentication service used to verify users
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**
     * Inject usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    /**
     * Inject usersCreateManyProvider
     */
    private readonly usersCreateManyUsers: UsersCreateManyProvider,
    /**
     * Inject createUserProvider
     */
    private readonly createUserProvider: CreateUserProvider,
    /**
     * Inject findOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    /**
     * Inject findOneByGoogleIdProvider
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    /**
     * Inject createGoogleUserProvider
     */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
    /**
     *  Inject PaginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Retrieves all users from the database
   *
   * @param {GetUsersParamDto} getUsersParamDto - The DTO containing query parameters for filtering users.
   * @param {number} limit - The maximum number of users to retrieve.
   * @param {number} page - The page number for pagination.
   * @returns {Array<{ firstName: string; lastName: string; email: string }>} An array of user objects.
   */
  public async findAll(
    getUsersDto: GetUsersDto,
    baseUrl: string,
    originalUrl: string,
  ) {
    this.logger.debug(`
      Starting findAll method with data, getUsersDto: ${JSON.stringify(getUsersDto)}
      `);

    try {
      const { page = 1, limit = 10, direction } = getUsersDto;

      // Build query with optional saerch and sorting
      let queryBuilder = this.usersRepository.createQueryBuilder('user');
      const sortDir = direction === SortDirection.DESC ? 'DESC' : 'ASC';

      queryBuilder = queryBuilder.orderBy(
        `CONCAT(user.firstName, ' ', user.lastName)`,
        sortDir,
      );

      return await this.paginationProvider.paginateQuery(
        { page, limit },
        this.usersRepository,
        queryBuilder,
        baseUrl,
        originalUrl,
      );
    } catch (error) {
      this.logger.error('Error retrieving users:', error.stack);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DATABASE_CONNECTION,
      );
    }
  }

  /**
   * Find a single user by their ID
   *
   * @param {string} id - The ID of the user to retrieve.
   * @returns {{ id: number; firstName: string; email: string }} The user object containing the user's details.
   */
  public async findOneById(id: string): Promise<User> {
    let user: User | null;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.error('Database connection error:', error);
      throw new InternalServerErrorException(
        'An error occurred while retrieving the user. Please try again later.',
      );
    }

    if (!user) {
      throw new NotFoundException(`The User with ID '${id}' not found`);
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyUsers.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
