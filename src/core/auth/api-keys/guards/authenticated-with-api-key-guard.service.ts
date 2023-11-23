import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { apiKeyOptions } from '../constants/api-key-options.constant';

@Injectable()
export class AuthenticatedWithApiKeyGuard extends AuthGuard(
  apiKeyOptions.strategyName,
) {}
