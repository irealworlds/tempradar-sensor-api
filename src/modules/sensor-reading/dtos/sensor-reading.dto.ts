import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Sensor } from '../../sensor/sensor.model';
import { SensorReading } from '../models/sensor-reading.model';

export class SensorReadingDto {
  resourceIdentifier: string;
  temperature?: number;
  humidity?: number;
  airQuality?: number;
  createdAt: Date;

  /**
   * Converts a SensorReading object to a SensorReadingDto object.
   *
   * @param {SensorReading} model - The SensorReading object to convert.
   * @return {SensorReadingDto} - The converted SensorReadingDto object.
   */
  static fromSensorReading(model: SensorReading): SensorReadingDto {
    const output = new SensorReadingDto();
    output.resourceIdentifier = model.resourceIdentifier;
    output.temperature = model.temperature;
    output.humidity = model.humidity;
    output.airQuality = model.airQuality;
    output.createdAt = model.createdAt;
    return output;
  }
}
