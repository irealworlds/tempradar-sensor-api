import { Module } from '@nestjs/common';
import { SensorReadingController } from '@app/modules/sensor-reading/sensor-reading.controller';
import { SensorReadingService } from '@app/modules/sensor-reading/sensor-reading.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorModule } from '@app/modules/sensor/sensor.module';
import {
  SensorReading,
  SensorReadingSchema,
} from '@app/modules/sensor-reading/models/sensor-reading.model';
import { ResourceIdentifiersModule } from '@app/core/resource-identifiers/resource-identifiers.module';
import { CaslModule } from '@app/core/casl/casl.module';

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
