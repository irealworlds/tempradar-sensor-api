import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sensor, SensorSchema } from './sensor.model';
import { SensorService } from './sensor.service';
import { SensorKeyService } from './sensor-key.service';
import { ResourceIdentifiersModule } from '../../core/resource-identifiers/resource-identifiers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }]),
    ResourceIdentifiersModule,
  ],
  controllers: [SensorController],
  providers: [SensorService, SensorKeyService],
  exports: [SensorService],
})
export class SensorModule {}
