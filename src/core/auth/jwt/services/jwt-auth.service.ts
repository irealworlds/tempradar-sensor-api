import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Sensor } from '../../../../modules/sensor/sensor.model';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthSessionDto } from '../dtos/jwt-auth-session.dto';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { SensorService } from '../../../../modules/sensor/sensor.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _sensorService: SensorService,
  ) {}

  /**
   * Sign in for a sensor.
   *
   * @param {Sensor} sensor - The sensor to sign in for.
   * @param {string} password - The password to use for authentication.
   * @returns {Promise<string>} A promise that resolves to a JSON Web Token (JWT) string.
   * @throws {UnauthorizedException} If the password does not match the sensor's password hash.
   */
  public async createAuthSessionForSensor(
    sensor: Sensor,
    password: string,
  ): Promise<JwtAuthSessionDto> {
    const success = await this._sensorService.validateAuthentication(
      sensor,
      password,
    );

    if (!success) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayloadDto = this._generateJwtPayload(sensor);

    return {
      subject: payload.sub,
      accessToken: await this._jwtService.signAsync(payload),
    };
  }

  private _generateJwtPayload(sensor: Sensor) {
    return {
      sub: sensor.resourceIdentifier,
      subType: Sensor.name,
      iat: Math.floor(Date.now() / 1000),
    };
  }
}
