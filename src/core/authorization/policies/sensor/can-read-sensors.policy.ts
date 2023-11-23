import { AbstractPolicyHandler } from '@app/core/authorization/policy-handler.type';
import { MongoAbility } from '@casl/ability';
import { CrudAction } from '@app/core/casl/enums/action.enum';
import { Sensor } from '@app/modules/sensor/sensor.model';

export class CanReadSensors extends AbstractPolicyHandler {
  /** @inheritDoc */
  handle(ability: MongoAbility): boolean {
    return ability.can(CrudAction.Read, Sensor);
  }
}
