import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

/**
 * Provider responsible for handling refresh token logic.
 * Verifies the refresh token, checks user existence, and issues new tokens.
 *
 * @export
 * @class RefreshTokensProvider
 */
@Injectable()
export class RefreshTokensProvider {
  /**
   * Creates an instance of RefreshTokensProvider.
   * @param usersService Service for user-related operations
   * @param jwtConfiguration JWT configuration object
   * @param jwtService Service for JWT operations
   * @param generateTokensProvider Provider for generating new tokens
   */
  constructor(
    /**
     * Inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,
    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  /**
   * Logger instance for the RefreshTokensProvider.
   */
  private readonly logger = new Logger(RefreshTokenDto.name);

  /**
   * Refreshes JWT tokens using a valid refresh token.
   * @param refreshTokenDto DTO containing the refresh token
   * @returns The new access and refresh tokens
   * @throws {UnauthorizedException} If the token is invalid, expired, or user not found
   */
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.usersService.findOneById(sub);
      if (!user) {
        this.logger.warn(`User not found for sub: ${sub}`);
        throw new UnauthorizedException('User not found for this token');
      }
      this.logger.debug(`Refresh token valid for user: ${user.email}`);
      // Generate tokens
      return this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      this.logger.error(
        'Error refreshing tokens',
        error.stack || error.message,
      );
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
