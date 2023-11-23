import { Module } from '@nestjs/common';
import { ApiKeysAuthModule } from './api-keys/api-keys-auth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { AuthService } from './auth.service';
import { SensorModule } from '../../modules/sensor/sensor.module';

@Module({
  imports: [ApiKeysAuthModule, JwtAuthModule, SensorModule],
  providers: [AuthService],
  exports: [ApiKeysAuthModule, JwtAuthModule, AuthService],
})
export class AuthModule {}
