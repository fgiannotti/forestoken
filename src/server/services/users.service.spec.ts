import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import {
  createMockUser,
  MockType,
  repositoryMockFactory
} from '../../test/test-utils';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;
  let mockUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Wallet),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
    mockUser = createMockUser();
  });

  it('should find a mockUser', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.findOneBy.mockReturnValue(mockUser);
    const actual = await service.findOne(mockUser.id);
    expect(actual).toStrictEqual(mockUser);
    // And make assertions on how often and with what params your mock's methods are called
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: mockUser.id });
  });
});
