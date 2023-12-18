import { SensorReadingDocument } from '@app/modules/sensor-reading/models/sensor-reading.model';

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
  static fromSensorReading(model: SensorReadingDocument): SensorReadingDto {
    const output = new SensorReadingDto();
    output.resourceIdentifier = model.resourceIdentifier;
    output.temperature = model.temperature;
    output.humidity = model.humidity;
    output.airQuality = model.airQuality;
    output.createdAt = model._id.getTimestamp();
    return output;
  }
}
