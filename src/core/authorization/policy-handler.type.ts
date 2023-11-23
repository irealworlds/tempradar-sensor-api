import { MongoAbility } from '@casl/ability';
import { Type } from '@nestjs/common/interfaces/type.interface';

export abstract class AbstractPolicyHandler {
  abstract handle(ability: MongoAbility): boolean;
}

export type PolicyHandler = AbstractPolicyHandler | Type<AbstractPolicyHandler>;
