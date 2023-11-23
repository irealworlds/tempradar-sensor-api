import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtOptions } from '../constants/jwt-options.constant';

@Injectable()
export class AuthenticatedWithJwtGuard extends AuthGuard(
  jwtOptions.strategyName,
) {}
