import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

/**
 * The SignInProvider is responsible for authenticating users
 * and generating a JWT access token upon successful login.
 */
@Injectable()
export class SignInProvider {
  private readonly logger = new Logger(SignInProvider.name);

  /**
   * Creates an instance of SignInProvider.
   *
   * @param usersService - Service to access user data
   * @param hashingProvider - Provider for password hashing and comparison
   * @param jwtService - Service to sign and verify JWTs
   * @param jwtConfiguration - JWT-related configuration settings
   */
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  /**
   * Signs in a user using provided credentials.
   *
   * @param signInDto - The user's sign-in credentials
   * @returns An object containing the generated access token
   * @throws {UnauthorizedException} If credentials are invalid
   */
  public async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    this.logger.debug(`Starting signIn method for email: ${email}`);

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      this.logger.warn(
        `Sign in failed: User not found for an email ${signInDto.email}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      this.logger.error(
        `User found but passwored is missing for email: ${email}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    let passwordMatches = false;
    try {
      passwordMatches = await this.hashingProvider.comparePassword(
        password,
        user.password,
      );
    } catch (error) {
      this.logger.error(
        `Password comparison failed for email: ${email}`,
        error.stack,
      );
      throw new UnauthorizedException('Authentication failed');
    }

    if (!passwordMatches) {
      this.logger.warn(`Invalid password provided for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokensProvider.generateTokens(user);
    this.logger.debug(`Sign-in successful for user: ${email}`);

    return tokens;
  }
}
