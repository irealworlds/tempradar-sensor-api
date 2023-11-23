import { MongoAbility } from '@casl/ability';
import { AbstractPolicyHandler } from '@app/core/authorization/policy-handler.type';
import { CrudAction } from '@app/core/casl/enums/action.enum';
import { SensorReading } from '@app/modules/sensor-reading/models/sensor-reading.model';

export class CanReadSensorReadings extends AbstractPolicyHandler {
  /** @inheritDoc */
  handle(ability: MongoAbility): boolean {
    return ability.can(CrudAction.Read, SensorReading);
  }
}
