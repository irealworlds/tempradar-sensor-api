import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayloadDto } from '@app/core/auth/jwt/dtos/jwt-payload.dto';
import { Sensor, SensorDocument } from '@app/modules/sensor/sensor.model';
import { SensorService } from '@app/modules/sensor/sensor.service';
import { TJwtAuthSubject } from '@app/core/auth/jwt/types/jwt-auth-subject.type';
import { ApiConsumerDocument } from '@app/core/auth/api-keys/models/api-consumer.model';
import { apiKeyOptions } from '@app/core/auth/api-keys/constants/api-key-options.constant';
import { ApiKeyService } from '@app/core/auth/api-keys/services/api-key.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _sensorService: SensorService,
    private readonly _apiKeyService: ApiKeyService,
  ) {}

  /**
   * Retrieves authentication subjects from the given request.
   *
   * @param {Request} request - The request object.
   *
   * @returns {Promise<(SensorDocument | ApiConsumerDocument)[]>} - The array of authentication subjects extracted from the request.
   */
  async getAuthSubjectsFromRequest(
    request: Request,
  ): Promise<(SensorDocument | ApiConsumerDocument)[]> {
    return [
      await this._extractSubjectFromJwt(request),
      await this._extractSubjectFromApiKey(request),
    ].filter((subject) => !!subject);
  }

  /**
   * Extracts the subject (ApiConsumer) from the API key in the request header.
   * @param {Request} request - The request object containing the API key.
   * @returns {Promise<ApiConsumerDocument>} The API consumer corresponding to the API key, if found.
   */
  private async _extractSubjectFromApiKey(
    request: Request,
  ): Promise<ApiConsumerDocument | undefined> {
    if (apiKeyOptions.headerName in request.headers) {
      const apiKey = request.headers[apiKeyOptions.headerName];
      if (typeof apiKey === 'string') {
        return await this._apiKeyService.findOneConsumerByApiKey(apiKey);
      }
    }

    return undefined;
  }

  /**
   * Extracts the subject from a JWT token in the request.
   *
   * @param {Request} request - The request object containing the JWT token.
   * @return {Promise<TJwtAuthSubject>} A promise that resolves with the extracted subject from the JWT token.
   */
  private async _extractSubjectFromJwt(
    request: Request,
  ): Promise<TJwtAuthSubject | undefined> {
    const jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const jwt = jwtExtractor(request);
    if (jwt?.length) {
      const payload = this._jwtService.decode<JwtPayloadDto>(jwt);
      switch (payload?.subType) {
        case Sensor.name: {
          return await this._sensorService.fetchByIdentifier(payload.sub);
        }
      }
    }

    return undefined;
  }
}
