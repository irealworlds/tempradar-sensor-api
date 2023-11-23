import { MongoAbility } from '@casl/ability';
import { AbstractPolicyHandler } from '../../policy-handler.type';
import { CrudAction } from '../../../casl/enums/action.enum';
import { SensorReading } from '../../../../modules/sensor-reading/models/sensor-reading.model';

export class CanReadSensorReadings extends AbstractPolicyHandler {
  /** @inheritDoc */
  handle(ability: MongoAbility): boolean {
    return ability.can(CrudAction.Read, SensorReading);
  }
}
