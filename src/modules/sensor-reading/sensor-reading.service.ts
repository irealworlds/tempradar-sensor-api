import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResourceIdentifierService } from '@app/core/resource-identifiers/resource-identifier.service';
import {
  SensorReading,
  SensorReadingDocument,
} from '@app/modules/sensor-reading/models/sensor-reading.model';
import { Sensor } from '@app/modules/sensor/sensor.model';
import { CreateSensorReadingDto } from '@app/modules/sensor-reading/dtos/create-sensor-reading.dto';

@Injectable()
export class SensorReadingService {
  constructor(
    @InjectModel(SensorReading.name)
    private readonly _readingModel: Model<SensorReading>,
    private readonly _resourceIdentifierService: ResourceIdentifierService,
  ) {}

  /**
   * Retrieves all sensor readings for a given sensor.
   *
   * @param {Sensor} sensor - The sensor object for which to fetch readings.
   * @return {Promise<SensorReadingDocument[]>} A promise that resolves with an array of sensor readings.
   */
  public async fetchAllForSensor(
    sensor: Sensor,
  ): Promise<SensorReadingDocument[]> {
    return this._readingModel
      .find({
        sensor,
      })
      .sort({
        createdAt: -1,
      })
      .exec();
  }
  /**
   * Creates a new sensor reading for the given sensor.
   *
   * @param {Sensor} sensor - The sensor object for which the reading is being created.
   * @param {CreateSensorReadingDto} data - The data object containing the sensor reading details.
   * @returns {Promise<SensorReadingDocument>} - A promise that resolves to the created SensorReading object.
   */
  public async createForSensor(
    sensor: Sensor,
    data: CreateSensorReadingDto,
  ): Promise<SensorReadingDocument> {
    const reading = new this._readingModel({
      sensor,
      temperature: data.temperature,
      airQuality: data.airQuality,
      humidity: data.humidity,
      resourceIdentifier:
        this._resourceIdentifierService.generateUniqueId('reading'),
    });
    return reading.save();
  }
}
