import { Sensor } from '../modules/sensor/sensor.model';

export class SensorDto {
  resourceIdentifier: string;
  name: string;
  macAddress: string;
  createdAt: Date = new Date();

  /**
   * Converts a Sensor model object to a SensorDto object.
   *
   * @param {Sensor} model - The Sensor model object to be converted.
   * @return {SensorDto} - The converted SensorDto object.
   */
  static fromSensorModel(model: Sensor): SensorDto {
    const output = new SensorDto();
    output.resourceIdentifier = model.resourceIdentifier;
    output.name = model.name;
    output.macAddress = model.macAddress;
    output.createdAt = model.createdAt;
    return output;
  }
}
