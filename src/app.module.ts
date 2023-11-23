import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorModule } from './modules/sensor/sensor.module';
import { ConfigModule } from '@nestjs/config';
import { ResourceIdentifiersModule } from './core/resource-identifiers/resource-identifiers.module';
import { AuthModule } from './modules/auth/auth.module';
import { SensorReadingModule } from './modules/sensor-reading/sensor-reading.module';
import { CaslModule } from './modules/casl/casl.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    ConfigModule.forRoot(),
    ResourceIdentifiersModule,
    SensorModule,
    AuthModule,
    SensorReadingModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
