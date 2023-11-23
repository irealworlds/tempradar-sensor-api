import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtOptions } from '../constants/jwt-options.constant';
import { Sensor } from '../../../../modules/sensor/sensor.model';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secret,
      jsonWebTokenOptions: {
        ignoreExpiration: false,
      },
    });
  }

  /**
   * Validates a JWT payload.
   *
   * @param {JwtPayloadDto} payload - The JWT payload to validate.
   * @return {Promise<Object>} - The validated payload.
   * @throws {Error} - If the subject type cannot be determined.
   */
  async validate(payload: JwtPayloadDto): Promise<object> {
    switch (payload?.subType) {
      case Sensor.name: {
        return {
          resourceIdentifier: payload.sub,
        };
      }

      default:
        throw new Error('Could not determine subject type.');
    }
  }
}
