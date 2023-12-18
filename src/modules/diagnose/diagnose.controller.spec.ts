import { Test, TestingModule } from '@nestjs/testing';
import { DiagnoseController } from './diagnose.controller';

describe('DiagnoseController', () => {
  let controller: DiagnoseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnoseController],
    }).compile();

    controller = module.get<DiagnoseController>(DiagnoseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
