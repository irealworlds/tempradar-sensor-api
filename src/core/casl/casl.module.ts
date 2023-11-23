import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { SensorModule } from '../../modules/sensor/sensor.module';
import { ApiKeysAuthModule } from '../auth/api-keys/api-keys-auth.module';

@Module({
  imports: [SensorModule, ApiKeysAuthModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
