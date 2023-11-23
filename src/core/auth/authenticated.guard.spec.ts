import { AuthenticatedGuard } from '@app/core/auth/authenticated.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthenticatedGuard()).toBeDefined();
  });
});
