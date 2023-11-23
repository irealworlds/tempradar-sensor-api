import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  MongoQuery,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { JwtPayloadDto } from '../auth/jwt/dtos/jwt-payload.dto';
import { Sensor, SensorDocument } from '../../modules/sensor/sensor.model';
import { SensorService } from '../../modules/sensor/sensor.service';
import { Document } from 'mongoose';
import { CrudAction, SensorAction } from './enums/action.enum';
import { SensorReading } from '../../modules/sensor-reading/models/sensor-reading.model';
import {
  ApiConsumer,
  ApiConsumerDocument,
} from '../auth/api-keys/models/api-consumer.model';

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly _sensorService: SensorService) {}

  async createForAuthSubject(subject: Document): Promise<MongoAbility> {
    switch (subject.$model().modelName) {
      case Sensor.name:
        return this.createForSensor(subject as SensorDocument);
      case ApiConsumer.name:
        return await this.createForApiConsumer(subject as ApiConsumerDocument);
    }
  }

  async createForApiConsumer(_: ApiConsumerDocument): Promise<MongoAbility> {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    can(CrudAction.Read, SensorReading);
    can(CrudAction.Read, Sensor);

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

  async createForJwtAuthPayload(
    payload?: JwtPayloadDto,
  ): Promise<MongoAbility> {
    switch (payload?.subType) {
      case Sensor.name: {
        const sensor = await this._sensorService.fetchByIdentifier(payload.sub);
        return this.createForSensor(sensor);
      }

      default:
        throw new Error('Could not find subject for ability factory.');
    }
  }

  createForSensor(sensor: SensorDocument): MongoAbility {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

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
