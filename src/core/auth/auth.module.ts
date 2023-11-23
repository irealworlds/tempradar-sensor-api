import { Module } from '@nestjs/common';
import { ApiKeysAuthModule } from '@app/core/auth/api-keys/api-keys-auth.module';
import { JwtAuthModule } from '@app/core/auth/jwt/jwt-auth.module';
import { AuthService } from '@app/core/auth/auth.service';
import { SensorModule } from '@app/modules/sensor/sensor.module';

@Module({
  imports: [ApiKeysAuthModule, JwtAuthModule, SensorModule],
  providers: [AuthService],
  exports: [ApiKeysAuthModule, JwtAuthModule, AuthService],
})
export class AuthModule {}
