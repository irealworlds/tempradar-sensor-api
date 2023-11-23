import { Module } from '@nestjs/common';
import { ApiKeyService } from './services/api-key.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiConsumer, ApiConsumerSchema } from './models/api-consumer.model';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { ResourceIdentifiersModule } from '../../resource-identifiers/resource-identifiers.module';

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
