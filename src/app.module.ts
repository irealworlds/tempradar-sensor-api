import { forwardRef, Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorModule } from '@app/modules/sensor/sensor.module';
import { ConfigModule } from '@nestjs/config';
import { ResourceIdentifiersModule } from '@app/core/resource-identifiers/resource-identifiers.module';
import { SensorReadingModule } from '@app/modules/sensor-reading/sensor-reading.module';
import { CaslModule } from '@app/core/casl/casl.module';
import { AuthModule } from '@app/core/auth/auth.module';
import { AuthSessionModule } from '@app/modules/auth-session/auth-session.module';
import { PoliciesGuard } from '@app/core/authorization/guards/policies.guard';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
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
