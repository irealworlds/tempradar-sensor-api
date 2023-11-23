import { Module } from '@nestjs/common';
import { SensorReadingController } from './sensor-reading.controller';
import { SensorReadingService } from './sensor-reading.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorModule } from '../sensor/sensor.module';
import {
  SensorReading,
  SensorReadingSchema,
} from './models/sensor-reading.model';
import { ResourceIdentifiersModule } from '../../core/resource-identifiers/resource-identifiers.module';
import { CaslModule } from '../../core/casl/casl.module';

@Module({
  controllers: [SensorReadingController],
  providers: [SensorReadingService],
  imports: [
    MongooseModule.forFeature([
      { name: SensorReading.name, schema: SensorReadingSchema },
    ]),
    CaslModule,
    ResourceIdentifiersModule,
    SensorModule,
  ],
})
export class SensorReadingModule {}
