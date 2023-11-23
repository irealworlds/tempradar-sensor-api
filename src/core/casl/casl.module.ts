import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { SensorModule } from '../../modules/sensor/sensor.module';

@Module({
  imports: [SensorModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
