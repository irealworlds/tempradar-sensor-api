import { Module } from '@nestjs/common';
import { DiagnoseController } from './diagnose.controller';

@Module({
  controllers: [DiagnoseController],
})
export class DiagnoseModule {}
