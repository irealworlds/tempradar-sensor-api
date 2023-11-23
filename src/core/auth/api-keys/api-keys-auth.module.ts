import { Module } from '@nestjs/common';
import { ApiKeyService } from '@app/core/auth/api-keys/services/api-key.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApiConsumer,
  ApiConsumerSchema,
} from '@app/core/auth/api-keys/models/api-consumer.model';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from '@app/core/auth/api-keys/strategies/api-key.strategy';
import { ResourceIdentifiersModule } from '@app/core/resource-identifiers/resource-identifiers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApiConsumer.name, schema: ApiConsumerSchema },
    ]),
    PassportModule,
    ResourceIdentifiersModule,
  ],
  providers: [ApiKeyService, ApiKeyStrategy],
  exports: [ApiKeyService, ApiKeyStrategy],
})
export class ApiKeysAuthModule {}
