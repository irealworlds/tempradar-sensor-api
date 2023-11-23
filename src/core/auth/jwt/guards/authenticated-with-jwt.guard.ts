import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtOptions } from '@app/core/auth/jwt/constants/jwt-options.constant';

@Injectable()
export class AuthenticatedWithJwtGuard extends AuthGuard(
  jwtOptions.strategyName,
) {}
