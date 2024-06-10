import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let authService: AuthService;

  const mockAuthService = {
    validateUserById: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-secret'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return the user if found', async () => {
      const payload: JwtPayload = {
        googleId: 'google-id',
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        picture: '',
      };
      const user = { id: 'user-id', googleId: 'google-id' };

      mockAuthService.validateUserById.mockResolvedValue(user);

      const result = await jwtStrategy.validate(payload);

      expect(authService.validateUserById).toHaveBeenCalledWith(
        payload.googleId,
      );
      expect(result).toEqual(user);
    });

    it('should throw an UnauthorizedException if user not found', async () => {
      const payload: JwtPayload = {
        googleId: 'google-id',
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        picture: '',
      };

      mockAuthService.validateUserById.mockResolvedValue(null);

      await expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.validateUserById).toHaveBeenCalledWith(
        payload.googleId,
      );
    });
  });
});
