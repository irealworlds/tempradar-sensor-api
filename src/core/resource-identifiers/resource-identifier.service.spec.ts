import { Test, TestingModule } from '@nestjs/testing';
import { ResourceIdentifierService } from '@app/core/resource-identifiers/resource-identifier.service';

describe('ResourceIdentifierService', () => {
  let service: ResourceIdentifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceIdentifierService],
    }).compile();

    service = module.get<ResourceIdentifierService>(ResourceIdentifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
