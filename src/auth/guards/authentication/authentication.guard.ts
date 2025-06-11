import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import {
  AUTH_TYPE_KEY,
  REQUEST_USER_KEY,
} from 'src/auth/constants/auth.constants';
import { UserRole } from 'src/users/enums/user-role.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Admin]: this.accessTokenGuard,
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }

  private readonly logger = new Logger(AuthenticationGuard.name);
  private static readonly defaultAuthType = AuthType.Bearer;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // authTypes from reflector
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // Array of guards
    const guards = authTypes
      .map((type) => this.authTypeGuardMap[type])
      .flat()
      .filter(Boolean);

    // Default error
    const error = new UnauthorizedException();

    // Loop through guards canActivate
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        this.logger.error('Guard error:', err);
      });
      if (canActivate) {
        // If Admin is required, check user role
        if (authTypes.includes(AuthType.Admin)) {
          const request = context.switchToHttp().getRequest();
          const user = request[REQUEST_USER_KEY];
          if (!user || user.role != UserRole.Admin) {
            throw new ForbiddenException('Admin role is required');
          }
        }
        return true;
      }
    }

    throw error;
  }
}
