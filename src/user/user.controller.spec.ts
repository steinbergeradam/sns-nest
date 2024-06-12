import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    restore: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await controller.find();
    expect(users).toBeDefined();
  });

  it('should find a user', async () => {
    const user = await controller.findOne('1');
    expect(user).toBeDefined();
  });

  it('should update a user', async () => {
    const user = await controller.update({ id: '1' });
    expect(user).toBeDefined();
  });

  it('should delete a user', async () => {
    const user = await controller.delete('1');
    expect(user).toBeDefined();
  });

  it('should restore a user', async () => {
    const user = await controller.restore('1');
    expect(user).toBeDefined();
  });
});
