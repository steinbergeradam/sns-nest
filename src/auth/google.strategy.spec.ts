import { Test, TestingModule } from '@nestjs/testing';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

describe('GoogleStrategy', () => {
  let googleStrategy: GoogleStrategy;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        GoogleStrategy,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    googleStrategy = module.get<GoogleStrategy>(GoogleStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(googleStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should validate user and call done with user', async () => {
      const profile = {
        id: 'google-id',
        name: { givenName: 'First', familyName: 'Last' },
        emails: [{ value: 'test@example.com' }],
        photos: [{ value: 'profile-pic-url' }],
      };
      const accessToken = 'access-token';
      const refreshToken = 'refresh-token';

      const user = {
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        picture: profile.photos[0].value,
        accessToken,
      };

      const validatedUser = {
        id: 'user-id',
        ...user,
      };

      mockAuthService.validateUser.mockResolvedValue(validatedUser);

      const done = jest.fn();

      await googleStrategy.validate(accessToken, refreshToken, profile, done);

      expect(authService.validateUser).toHaveBeenCalledWith(user);
      expect(done).toHaveBeenCalledWith(null, validatedUser);
    });
  });
});
