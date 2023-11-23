import { Injectable } from '@nestjs/common';
import { AbilityBuilder, MongoQuery, createMongoAbility } from '@casl/ability';
import { JwtPayloadDto } from '../auth/jwt/dtos/jwt-payload.dto';
import { Sensor } from '../../modules/sensor/sensor.model';
import { SensorService } from '../../modules/sensor/sensor.service';
import { Document } from 'mongoose';
import { SensorAction } from './enums/action.enum';

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly _sensorService: SensorService) {}

  async createForAuthPayload(payload?: JwtPayloadDto) {
    switch (payload?.subType) {
      case Sensor.name: {
        const sensor = await this._sensorService.fetchByIdentifier(payload.sub);
        return this.createForSensor(sensor);
      }

      default:
        throw new Error('Could not find subject for ability factory.');
    }
  }

  createForSensor(sensor: Sensor) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    can(SensorAction.CreateReading, Sensor.name, {
      resourceIdentifier: sensor.resourceIdentifier,
    } as MongoQuery<Sensor>);

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => {
        if (item instanceof Document) {
          return item.$model().modelName;
        }
        return item.constructor.name;
      },
    });
  }
}
