import { Module } from '@nestjs/common';
import { ResourceIdentifierService } from './resource-identifier.service';

@Module({
  providers: [ResourceIdentifierService],
  exports: [ResourceIdentifierService],
})
export class ResourceIdentifiersModule {}
