import { Module } from '@nestjs/common';
import { SensorController } from '@app/modules/sensor/sensor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sensor, SensorSchema } from '@app/modules/sensor/sensor.model';
import { SensorService } from '@app/modules/sensor/sensor.service';
import { SensorKeyService } from '@app/modules/sensor/sensor-key.service';
import { ResourceIdentifiersModule } from '@app/core/resource-identifiers/resource-identifiers.module';

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
