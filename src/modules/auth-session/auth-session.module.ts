import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SensorModule } from '../sensor/sensor.module';
import { JwtAuthModule } from '../../core/auth/jwt/jwt-auth.module';

@Module({
  controllers: [AuthController],
  imports: [SensorModule, JwtAuthModule],
})
export class AuthSessionModule {}
