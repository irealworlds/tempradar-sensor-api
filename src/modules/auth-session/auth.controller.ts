import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthSessionsCreateDto } from '@app/modules/auth-session/dtos/auth-sessions-create.dto';
import { SensorService } from '@app/modules/sensor/sensor.service';
import { JwtAuthService } from '@app/core/auth/jwt/services/jwt-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _sensorService: SensorService,
    private readonly _authService: JwtAuthService,
  ) {}

  /**
   * Signs in a user.
   *
   * @param {AuthSessionsCreateDto} data - The authentication session data.
   * @return {Promise<any>} - The signed-in user.
   * @throws {NotFoundException} - If the sensor is not found.
   */
  @Post('/sessions')
  async signIn(@Body() data: AuthSessionsCreateDto): Promise<any> {
    const sensor = await this._sensorService.fetchByMacAddress(data.macAddress);

    if (!sensor) {
      throw new NotFoundException();
    }

    return this._authService.createAuthSessionForSensor(sensor, data.password);
  }
}
