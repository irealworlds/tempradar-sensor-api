import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthenticatedWithApiKeyGuard } from './api-keys/guards/authenticated-with-api-key-guard.service';
import { AuthenticatedWithJwtGuard } from './jwt/guards/authenticated-with-jwt.guard';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly _apiKeyGuard: AuthenticatedWithApiKeyGuard,
    private readonly _jwtGuard: AuthenticatedWithJwtGuard,
  ) {}

  /** @inheritDoc */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.anyPasses([
      this._apiKeyGuard.canActivate(context),
      this._jwtGuard.canActivate(context),
    ]);
  }

  /**
   * Checks if any of the provided guards passes.
   *
   * @param {Array<boolean | Promise<boolean> | Observable<boolean>>} guards - An array of guards to be checked.
   * @return {Promise<boolean>} - A promise that resolves to true if any of the guards passes, or false otherwise.
   */
  async anyPasses(
    guards: Array<boolean | Promise<boolean> | Observable<boolean>>,
  ): Promise<boolean> {
    const results = await Promise.all(
      guards.map(async (guard) => {
        if (guard instanceof Promise) {
          return await guard;
        } else if (guard instanceof Observable) {
          return await lastValueFrom(guard);
        } else {
          return guard;
        }
      }),
    );
    return results.some((result) => !!result);
  }
}
