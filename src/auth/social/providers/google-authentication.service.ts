import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  constructor(
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * Inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  private readonly logger = new Logger(GoogleAuthenticationService.name);
  private oauthClient: OAuth2Client;

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the Google token sent by user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // Extract the payload from Google JWT
      const payload = loginTicket.getPayload();
      if (!payload) {
        // Handle the error appropriately, e.g., throw an UnauthorizedException
        throw new UnauthorizedException('Invalid Google token payload');
      }
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = payload;

      // Ensure all required fields are present
      if (!email || !googleId || !firstName || !lastName) {
        throw new UnauthorizedException(
          'Missing required Google user information',
        );
      }

      // Find the user in the database using the GoogleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      // If googleId exists generate token
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      // If not create a new user and then generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName,
        lastName,
        googleId,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      // Throw Unauthorized exception
      throw new UnauthorizedException(
        error instanceof UnauthorizedException
          ? error.message
          : 'Google authentication failed',
      );
    }
  }
}
