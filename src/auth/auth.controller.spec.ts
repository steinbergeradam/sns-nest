import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';

describe('AuthController', () => {
  let authController: AuthController;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        {
          provide: 'AuthGuard',
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
        Reflector,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('googleAuth', () => {
    it('should initiate Google OAuth login flow', async () => {
      const req = {};
      const result = await authController.googleAuth(req);
      expect(result).toBeUndefined(); // googleAuth doesn't return anything
    });
  });

  describe('googleAuthRedirect', () => {
    it('should redirect with a JWT token', async () => {
      const req = {
        user: { id: '123', name: 'Test User' },
      };
      const res = {
        redirect: jest.fn(),
      };

      jest.spyOn(jwtService, 'sign').mockReturnValue('testToken');

      await authController.googleAuthRedirect(req, res as any);

      expect(jwtService.sign).toHaveBeenCalledWith(req.user);
      expect(res.redirect).toHaveBeenCalledWith(
        `${process.env.FRONTEND_URL}/api/auth/callback?token=testToken`,
      );
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', async () => {
      const req = {
        user: { id: '123', name: 'Test User' },
      };

      const result = await authController.getProfile(req);

      expect(result).toEqual(req.user);
    });
  });
});
