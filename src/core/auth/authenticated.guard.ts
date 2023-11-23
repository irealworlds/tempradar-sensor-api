import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtOptions } from '@app/core/auth/jwt/constants/jwt-options.constant';
import { apiKeyOptions } from '@app/core/auth/api-keys/constants/api-key-options.constant';

@Injectable()
export class AuthenticatedGuard extends AuthGuard([
  jwtOptions.strategyName,
  apiKeyOptions.strategyName,
]) {}
