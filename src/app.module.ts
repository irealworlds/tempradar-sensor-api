import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorModule } from './modules/sensor/sensor.module';
import { ConfigModule } from '@nestjs/config';
import { ResourceIdentifiersModule } from './core/resource-identifiers/resource-identifiers.module';
import { SensorReadingModule } from './modules/sensor-reading/sensor-reading.module';
import { CaslModule } from './core/casl/casl.module';
import { AuthModule } from './core/auth/auth.module';
import { AuthSessionModule } from './modules/auth-session/auth-session.module';
import { PoliciesGuard } from './core/authorization/guards/policies.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    ConfigModule.forRoot(),
    ResourceIdentifiersModule,
    forwardRef(() => AuthModule),
    CaslModule,
    SensorModule,
    SensorReadingModule,
    AuthSessionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
  ],
})
export class AppModule {}
