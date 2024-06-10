import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from '../database/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return existing user', async () => {
      const profile = {
        email: 'test@example.com',
        googleId: 'google-id',
        firstName: 'First',
        lastName: 'Last',
        picture: 'profile-pic-url',
      };
      const existingUser = {
        id: '1',
        ...profile,
      };

      mockUserRepository.findOne.mockResolvedValue(existingUser);

      const result = await authService.validateUser(profile);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: profile.email },
      });
      expect(result).toEqual(existingUser);
    });

    it('should create and return a new user', async () => {
      const profile = {
        email: 'new@example.com',
        googleId: 'google-id',
        firstName: 'First',
        lastName: 'Last',
        picture: 'profile-pic-url',
      };
      const newUser = {
        id: '2',
        ...profile,
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValue(newUser);

      const result = await authService.validateUser(profile);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: profile.email },
      });
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        googleId: profile.googleId,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        picture: profile.picture,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });
  });

  describe('validateUserById', () => {
    it('should return user by googleId', async () => {
      const googleId = 'google-id';
      const existingUser = {
        id: '1',
        googleId: googleId,
        email: 'test@example.com',
        firstName: 'First',
        lastName: 'Last',
        picture: 'profile-pic-url',
      };

      mockUserRepository.findOne.mockResolvedValue(existingUser);

      const result = await authService.validateUserById(googleId);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { googleId: googleId },
      });
      expect(result).toEqual(existingUser);
    });
  });
});
