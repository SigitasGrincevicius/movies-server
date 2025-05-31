import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

/**
 * Provider for generating JWT tokens with custom payload and expiration.
 */
@Injectable()
export class GenerateTokensProvider {
  constructor(
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Signs a JWT token for a user.
   * @param userId The user's unique identifier (will be set as `sub` claim).
   * @param expiresIn Token expiration time (seconds).
   * @param payload Optional additional payload to include in the token.
   * @returns The signed JWT token as a string.
   */
  public async signToken(
    userId: string,
    expiresIn: number,
    payload: Record<string, any> = {},
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      // Generate the access token
      this.signToken(user.id, this.jwtConfiguration.accessTokenTTL, {
        email: user.email,
      }),
      // Generate the refresh token
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
