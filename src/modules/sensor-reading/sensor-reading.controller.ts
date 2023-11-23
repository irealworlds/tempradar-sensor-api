import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { SensorService } from '@app/modules/sensor/sensor.service';
import { SensorReadingService } from '@app/modules/sensor-reading/sensor-reading.service';
import { SensorReadingDto } from '@app/modules/sensor-reading/dtos/sensor-reading.dto';
import { CreateSensorReadingDto } from '@app/modules/sensor-reading/dtos/create-sensor-reading.dto';
import { CaslAbilityFactory } from '@app/core/casl/casl-ability.factory';
import { SensorAction } from '@app/core/casl/enums/action.enum';
import { CanReadSensorReadings } from '@app/core/authorization/policies/sensor-reading/can-read-sensor-readings.policy';
import { CheckPolicies } from '@app/core/authorization/check-policies.decorator';
import { AuthenticatedGuard } from '@app/core/auth/authenticated.guard';

@Controller('sensors')
export class SensorReadingController {
  constructor(
    private readonly _sensorService: SensorService,
    private readonly _readingService: SensorReadingService,
    private readonly _abilityFactory: CaslAbilityFactory,
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
  @UseGuards(AuthenticatedGuard)
  @CheckPolicies(CanReadSensorReadings)
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

  /**
   * Creates a new sensor reading for a given sensor.
   *
   * @param {Object} params - The sensor ID as a parameter object.
   * @param {string} params.sensorId - The ID of the sensor.
   * @param {Object} data - The data for the new sensor reading.
   * @param {Request} request - The HTTP request object.
   *
   * @returns {Promise<SensorReadingDto>} The created sensor reading.
   *
   * @throws {NotFoundException} If the sensor ID is not found.
   * @throws {ForbiddenException} If the user does not have the permission to create a reading for the sensor.
   */
  @UseGuards(AuthenticatedGuard)
  @Post(':sensorId/readings')
  public async createAsync(
    @Param() params: { sensorId: string },
    @Body() data: CreateSensorReadingDto,
    @Req() request: Request,
  ): Promise<SensorReadingDto> {
    if (!('sensorId' in params)) {
      throw new NotFoundException();
    }

    const sensor = await this._sensorService.fetchByIdentifier(params.sensorId);
    if (!sensor) {
      throw new NotFoundException();
    }

    const { authSubject } = request as any;
    const abilities =
      await this._abilityFactory.createForJwtAuthPayload(authSubject);
    if (abilities.cannot(SensorAction.CreateReading, sensor)) {
      throw new ForbiddenException();
    }

    const reading = await this._readingService.createForSensor(sensor, data);

    return SensorReadingDto.fromSensorReading(reading);
  }
}
