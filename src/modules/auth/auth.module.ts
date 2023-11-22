import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from './constants/jwt-options.constant';
import { SensorModule } from '../sensor/sensor.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtOptions.secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    SensorModule,
  ],
})
export class AuthModule {}
