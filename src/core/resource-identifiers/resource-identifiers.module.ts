import { Module } from '@nestjs/common';
import { ResourceIdentifierService } from '@app/core/resource-identifiers/resource-identifier.service';

@Module({
  providers: [ResourceIdentifierService],
  exports: [ResourceIdentifierService],
})
export class ResourceIdentifiersModule {}
