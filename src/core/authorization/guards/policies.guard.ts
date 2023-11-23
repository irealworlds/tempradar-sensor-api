import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { ModuleRef, Reflector } from '@nestjs/core';
import { AbstractPolicyHandler, PolicyHandler } from '../policy-handler.type';
import { CHECK_POLICIES_KEY } from '../check-policies.decorator';
import { MongoAbility } from '@casl/ability';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _caslAbilityFactory: CaslAbilityFactory,
    private readonly _moduleRef: ModuleRef,
    private readonly _authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this._reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    if (policyHandlers?.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    // Extract authentication subjects from the request
    const authSubjects =
      await this._authService.getAuthSubjectsFromRequest(request);

    if (authSubjects.length === 0) {
      throw new UnauthorizedException();
    }

    // Get the abilities that these subjects have
    const abilities = await Promise.all(
      authSubjects.map(
        async (subject) =>
          await this._caslAbilityFactory.createForAuthSubject(subject),
      ),
    );

    // Resolve the results of all policies
    const policyResults = (
      await Promise.all(
        policyHandlers.map((handler) =>
          Promise.all(
            abilities.map(
              async (ability) =>
                await this.executePolicyHandler(handler, ability),
            ),
          ),
        ),
      )
    ).map((resultSet) => resultSet.includes(true));

    // Make sure every policy has passed
    return policyResults.every((policy) => policy === true);
  }

  private async executePolicyHandler(
    handler: PolicyHandler,
    ability: MongoAbility,
  ) {
    if (handler instanceof AbstractPolicyHandler) {
      return handler.handle(ability);
    } else {
      const handlerInstance = await this._moduleRef.create(handler);
      return handlerInstance.handle(ability);
    }
  }
}
