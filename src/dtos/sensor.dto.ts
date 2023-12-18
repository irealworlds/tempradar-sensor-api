import { SensorDocument } from '@app/modules/sensor/sensor.model';

export class SensorDto {
  resourceIdentifier: string;
  name: string;
  macAddress: string;
  createdAt: Date;

  /**
   * Converts a Sensor model object to a SensorDto object.
   *
   * @param {SensorDocument} model - The Sensor model object to be converted.
   * @return {SensorDto} - The converted SensorDto object.
   */
  static fromSensorModel(model: SensorDocument): SensorDto {
    const output = new SensorDto();
    output.resourceIdentifier = model.resourceIdentifier;
    output.name = model.name;
    output.macAddress = model.macAddress;
    output.createdAt = model._id.getTimestamp();
    return output;
  }
}
