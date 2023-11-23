import { Module } from '@nestjs/common';
import { AuthController } from '@app/modules/auth-session/auth.controller';
import { SensorModule } from '@app/modules/sensor/sensor.module';
import { JwtAuthModule } from '@app/core/auth/jwt/jwt-auth.module';

@Module({
  controllers: [AuthController],
  imports: [SensorModule, JwtAuthModule],
})
export class AuthSessionModule {}
