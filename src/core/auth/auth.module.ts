import { Module } from '@nestjs/common';
import { ApiKeysAuthModule } from './api-keys/api-keys-auth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';

@Module({
  imports: [ApiKeysAuthModule, JwtAuthModule],
  exports: [ApiKeysAuthModule, JwtAuthModule],
})
export class AuthModule {}
