import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthenticatedGuard()).toBeDefined();
  });
});
