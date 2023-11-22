import { Test, TestingModule } from '@nestjs/testing';
import { SensorKeyService } from './sensor-key.service';

describe('SensorKeyService', () => {
  let service: SensorKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorKeyService],
    }).compile();

    service = module.get<SensorKeyService>(SensorKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
