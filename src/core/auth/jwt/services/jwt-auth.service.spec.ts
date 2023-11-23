import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthService } from '@app/core/auth/jwt/services/jwt-auth.service';

describe('AuthService', () => {
  let service: JwtAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthService],
    }).compile();

    service = module.get<JwtAuthService>(JwtAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
