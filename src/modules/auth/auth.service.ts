import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Sensor } from '../sensor/sensor.model';
import { JwtService } from '@nestjs/jwt';
import { SignInResultDto } from './dtos/sign-in-result.dto';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService) {}

  /**
   * Determines whether the given password matches the given hash using bcrypt.
   *
   * @param {string} input - The password to check.
   * @param {string} hash - The hash to compare against.
   * @return {Promise<boolean>} - A promise that resolves to a boolean indicating if the password matches the hash.
   */
  public async passwordMatchesHash(
    input: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(input, hash);
  }

  /**
   * Sign in for a sensor.
   *
   * @param {Sensor} sensor - The sensor to sign in for.
   * @param {string} password - The password to use for authentication.
   * @returns {Promise<string>} A promise that resolves to a JSON Web Token (JWT) string.
   * @throws {UnauthorizedException} If the password does not match the sensor's password hash.
   */
  public async signInForSensor(
    sensor: Sensor,
    password: string,
  ): Promise<SignInResultDto> {
    const passwordMatches = await this.passwordMatchesHash(
      password,
      sensor.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayloadDto = {
      sub: sensor.resourceIdentifier,
      iat: Date.now(),
    };

    return {
      subject: payload.sub,
      accessToken: await this._jwtService.signAsync(payload),
    };
  }
}
