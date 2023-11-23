import { Module } from '@nestjs/common';
import { JwtAuthService } from './services/jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from './constants/jwt-options.constant';
import { SensorModule } from '../../../modules/sensor/sensor.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService, JwtStrategy, JwtModule],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtOptions.secret,
      signOptions: {
        expiresIn: 24 * 60 * 60, // 24h
      },
    }),
    SensorModule,
  ],
})
export class JwtAuthModule {}
