import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { jwtOptions } from '../../constants/jwt-options.constant';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  /** @inheritDoc */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this._jwtService.verifyAsync(token, {
        secret: jwtOptions.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['authSubject'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * Extracts the token from the Authorization header of the given request object.
   *
   * @param {Request} request - The request object containing the Authorization header.
   *
   * @return {string|undefined} - The extracted token if found, otherwise undefined.
   */
  private _extractTokenFromHeader(request: Request): string | undefined {
    if ('authorization' in request.headers) {
      const header = request.headers['authorization'];
      if (typeof header === 'string') {
        const [type, token] = header.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
    }

    return undefined;
  }
}
