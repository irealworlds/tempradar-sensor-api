import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { apiKeyOptions } from '@app/core/auth/api-keys/constants/api-key-options.constant';
import { ApiKeyService } from '@app/core/auth/api-keys/services/api-key.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  apiKeyOptions.strategyName,
) {
  constructor(private readonly _apiKeyService: ApiKeyService) {
    super(
      {
        header: apiKeyOptions.headerName,
        prefix: '',
      },
      true,
      async (
        apiKey: string,
        result: (err: Error | null, success: boolean) => void,
      ) => {
        if (await this._apiKeyService.verifyApiKey(apiKey)) {
          result(null, true);
        }

        result(new UnauthorizedException(), null);
      },
    );
  }
}
