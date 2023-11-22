import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SensorService } from '../sensor/sensor.service';
import { SensorReadingService } from './sensor-reading.service';
import { SensorReadingDto } from './dtos/sensor-reading.dto';
import { CreateSensorReadingDto } from './dtos/create-sensor-reading.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated/authenticated.guard';

@Controller('sensors')
export class SensorReadingController {
  constructor(
    private readonly _sensorService: SensorService,
    private readonly _readingService: SensorReadingService,
  ) {}

  /**
   * Fetches all sensor readings for a given sensor identifier.
   *
   * @param {Object} params - The parameter object containing the sensor identifier.
   * @param {string} params.sensorId - The identifier of the sensor.
   *
   * @returns {Promise<SensorReadingDto[]>} - A promise that resolves to an array of SensorReadingDto objects.
   *
   * @throws {NotFoundException} If the sensor with the given identifier does not exist.
   */
  @Get(':sensorId/readings')
  public async indexAsync(
    @Param() params: { sensorId: string },
  ): Promise<SensorReadingDto[]> {
    if (!('sensorId' in params)) {
      throw new NotFoundException();
    }

    const sensor = await this._sensorService.fetchByIdentifier(params.sensorId);
    if (!sensor) {
      throw new NotFoundException();
    }

    const readings = await this._readingService.fetchAllForSensor(sensor);

    return readings.map((reading) =>
      SensorReadingDto.fromSensorReading(reading),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':sensorId/readings')
  public async createAsync(
    @Param() params: { sensorId: string },
    @Body() data: CreateSensorReadingDto,
  ): Promise<SensorReadingDto> {
    if (!('sensorId' in params)) {
      throw new NotFoundException();
    }

    const sensor = await this._sensorService.fetchByIdentifier(params.sensorId);
    if (!sensor) {
      throw new NotFoundException();
    }

    const reading = await this._readingService.createForSensor(sensor, data);

    return SensorReadingDto.fromSensorReading(reading);
  }
}
