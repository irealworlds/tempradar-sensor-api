import { Test, TestingModule } from '@nestjs/testing';
import { SensorReadingController } from '@app/modules/sensor-reading/sensor-reading.controller';

describe('SensorReadingController', () => {
  let controller: SensorReadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorReadingController],
    }).compile();

    controller = module.get<SensorReadingController>(SensorReadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
