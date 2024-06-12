import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    findOne: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockResolvedValue({}),
    softRemove: jest.fn().mockResolvedValue({}),
    recover: jest.fn().mockResolvedValue({}),
  };

  const mockAddressRepository = {
    findOne: jest.fn().mockResolvedValue({}),
    save: jest.fn().mockResolvedValue({}),
  };

  const mockDenominationRepository = {
    findOne: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
        {
          provide: 'AddressRepository',
          useValue: mockAddressRepository,
        },
        {
          provide: 'DenominationRepository',
          useValue: mockDenominationRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await service.find();
    expect(users).toBeDefined();
  });

  it('should find a user', async () => {
    const user = await service.findOne('1');
    expect(user).toBeDefined();
  });

  it('should update a user', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce({
      id: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
    });
    mockAddressRepository.findOne.mockResolvedValueOnce({
      id: '1',
      city: 'city',
      state: 'state',
      street: 'street',
      zip: 'zip',
    });
    mockDenominationRepository.findOne.mockResolvedValueOnce({
      id: 1,
    });
    const updatedUser = await service.update({
      id: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
      phoneNumber: 'phoneNumber',
      birthdate: new Date(),
      address: {
        id: '1',
        city: 'city',
        state: 'state',
        street: 'street',
        zip: 'zip',
      },
      gender: 'M',
      bio: 'bio',
      denominationId: 1,
      statementOfFaith: 'statementOfFaith',
    });
    expect(updatedUser).toBeDefined();
  });

  it('should delete a user', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce({
      id: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
    });
    const result = await service.delete('1');
    expect(mockUserRepository.softRemove).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('should restore a user', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce({
      id: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
    });
    const result = await service.restore('1');
    expect(mockUserRepository.recover).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
