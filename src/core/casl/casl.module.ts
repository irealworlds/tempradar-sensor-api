import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '@app/core/casl/casl-ability.factory';
import { SensorModule } from '@app/modules/sensor/sensor.module';
import { ApiKeysAuthModule } from '@app/core/auth/api-keys/api-keys-auth.module';

@Module({
  imports: [SensorModule, ApiKeysAuthModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
