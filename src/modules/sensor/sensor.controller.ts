import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { SensorService } from '@app/modules/sensor/sensor.service';
import { SensorCreateDto } from '@app/dtos/sensor-create.dto';
import { SensorDto } from '@app/dtos/sensor.dto';
import { PaginationOptionsDto } from '@app/core/pagination/pagination-options.dto';
import { PaginatedResultDto } from '@app/core/pagination/paginated-result.dto';

@Controller('sensors')
export class SensorController {
  constructor(private readonly _sensorService: SensorService) {}

  @Get()
  public async index(
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResultDto<SensorDto>> {
    return await this._sensorService.fetchAllPaginated(
      pagination.skip,
      pagination.limit ?? 10,
    );
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() data: SensorCreateDto) {
    const sensor = await this._sensorService.create(data);
    return SensorDto.fromSensorModel(sensor);
  }
}
