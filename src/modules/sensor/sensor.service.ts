import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Sensor, SensorDocument } from '@app/modules/sensor/sensor.model';
import { InjectModel } from '@nestjs/mongoose';
import { SensorCreateDto } from '@app/dtos/sensor-create.dto';
import { ResourceIdentifierService } from '@app/core/resource-identifiers/resource-identifier.service';
import * as bcrypt from 'bcrypt';
import { PaginatedResultDto } from '@app/core/pagination/paginated-result.dto';
import { PaginationMetadataDto } from '@app/core/pagination/pagination-metadata.dto';
import { SensorDto } from '@app/dtos/sensor.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectModel(Sensor.name) private readonly _sensorModel: Model<Sensor>,
    private readonly _resourceIdentifierService: ResourceIdentifierService,
  ) {}

  /**
   * Fetch all sensor data.
   *
   * @returns {Promise<SensorDocument[]>} - A promise that resolves to an array of Sensor objects.
   */
  async fetchAll(): Promise<SensorDocument[]> {
    return this._sensorModel
      .find()
      .sort({
        createdAt: -1,
      })
      .exec();
  }
  /**
   * Fetches all items in a paginated manner.
   *
   * @param {number} [skip] - The number of items to skip.
   * @param {number} [limit] - The maximum number of items to return per page.
   * @returns {Promise<PaginatedResultDto<SensorDocument>>} - A promise that resolves to a PaginatedResultDto containing the fetched items and pagination metadata.
   *
   */
  async fetchAllPaginated(
    skip?: number,
    limit?: number,
  ): Promise<PaginatedResultDto<SensorDto>> {
    let query = this._sensorModel
      .find()
      .sort({
        createdAt: -1,
      })
      .skip(skip ?? 0);

    if (limit) {
      query = query.limit(limit);
    }

    const items = await query.exec();

    return new PaginatedResultDto({
      items: items.map((item) => SensorDto.fromSensorModel(item)),
      _metadata: new PaginationMetadataDto({
        total: await this._sensorModel.countDocuments().exec(),
      }),
    });
  }

  /**
   * Fetches a sensor by its MAC address.
   *
   * @param {string} macAddress - The MAC address of the sensor.
   * @return {Promise<SensorDocument>} - Resolves with the found sensor, or undefined if no sensor exists with the given MAC address.
   */
  async fetchByMacAddress(macAddress: string): Promise<SensorDocument> {
    return await this._sensorModel
      .findOne({
        macAddress,
      })
      .exec();
  }

  /**
   * Fetches a sensor by its MAC address.
   *
   * @param {string} resourceIdentifier - The sensor's resource identifier.
   * @return {Promise<SensorDocument>} - Resolves with the found sensor, or undefined if no sensor exists with the given MAC address.
   */
  async fetchByIdentifier(resourceIdentifier: string): Promise<SensorDocument> {
    return await this._sensorModel
      .findOne({
        resourceIdentifier,
      })
      .exec();
  }

  /**
   * Create a new sensor.
   *
   * @param {SensorCreateDto} data - The data for creating the sensor.
   * @returns {Promise<SensorDocument>} A Promise that resolves with the created sensor.
   */
  async create(data: SensorCreateDto): Promise<SensorDocument> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(data.password, salt);

    const sensor = new this._sensorModel({
      name: data.name,
      macAddress: data.macAddress,
      passwordHash: passwordHash,
      resourceIdentifier:
        this._resourceIdentifierService.generateUniqueId('sensor'),
    });
    return sensor.save();
  }

  /**
   * Validates the authentication of a sensor using a password.
   *
   * @param {Sensor} sensor - The sensor object containing the password hash.
   * @param {string} password - The password to validate.
   * @returns {Promise<boolean>} - A promise that resolves to true if the authentication is successful, otherwise false.
   */
  async validateAuthentication(
    sensor: Sensor,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, sensor.passwordHash);
  }
}
