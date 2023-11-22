import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorCreateDto } from '../../dtos/sensor-create.dto';
import { SensorDto } from '../../dtos/sensor.dto';

@Controller('sensors')
export class SensorController {
  constructor(private readonly _sensorService: SensorService) {}

  @Get()
  public async index() {
    const sensors = await this._sensorService.fetchAll();
    return sensors.map((sensor) => SensorDto.fromSensorModel(sensor));
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() data: SensorCreateDto) {
    const sensor = await this._sensorService.create(data);
    return SensorDto.fromSensorModel(sensor);
  }
}
