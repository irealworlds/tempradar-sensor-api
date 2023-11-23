import {
  AbstractPolicyHandler,
  PolicyHandler,
} from '@app/core/authorization/policy-handler.type';
import { SetMetadata } from '@nestjs/common';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (
  ...handlers: Array<PolicyHandler | typeof AbstractPolicyHandler>
) => SetMetadata(CHECK_POLICIES_KEY, handlers);
