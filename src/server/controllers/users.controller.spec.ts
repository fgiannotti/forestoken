import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { createResponse, MockResponse } from 'node-mocks-http';
import { UserDto } from '../dtos/user.dto';
import { createMockUser, createMockUserDto, createMockWallet } from '../../../test/test-utils';
import { MovementsService } from '../services/movements.service';
import { WalletsService } from '../services/wallets.service';
import { Wallet } from '../entities/wallet.entity';

const TEST_ERR = Error('F');

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;
  let walletService: WalletsService;
  let response: MockResponse<Response>;
  let mockUser: User;
  let mockUserDto: UserDto;
  let mockWallet: Wallet;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockImplementation(),
            findOne: jest.fn().mockImplementation(),
            remove: jest.fn().mockImplementation(),
            create: jest.fn().mockImplementation(),
            save: jest.fn().mockImplementation(),
          },
        },
        {
          provide: MovementsService,
          useValue: {
            findAll: jest.fn().mockImplementation(),
            findOne: jest.fn().mockImplementation(),
            remove: jest.fn().mockImplementation(),
            create: jest.fn().mockImplementation(),
          },
        },
        {
          provide: WalletsService,
          useValue: {
            generateAddressFor: jest.fn().mockImplementation(),
          },
        },
      ],
    }).compile();
    mockWallet = createMockWallet();
    mockUser = createMockUser();
    mockUserDto = createMockUserDto();
    userService = module.get<UsersService>(UsersService);
    walletService = module.get<WalletsService>(WalletsService);
    controller = module.get<UsersController>(UsersController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll tests', () => {
    it('should return an array of users and OK', async () => {
      const list: User[] = [mockUser];
      const jsonUsers: Object[] = [JSON.parse(JSON.stringify(mockUser))];
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(list);

      await controller.findAll(response);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual(jsonUsers);
    });

    it('should return 500 when userService fails', async () => {
      jest.spyOn(userService, 'findAll').mockImplementationOnce(() => {
        throw TEST_ERR;
      });
      await expect(controller.findAll(response)).rejects.toThrow(TEST_ERR);
    });
  });

  describe('getById', () => {
    it('should get a single user', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);

      await controller.findById(response, 123);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toEqual(JSON.parse(JSON.stringify(mockUser)));
    });

    it('should return 500 when userService fails', async () => {
      jest.spyOn(userService, 'findOne').mockImplementationOnce(() => {
        throw TEST_ERR;
      });

      await expect(controller.findById(response, 123)).rejects.toThrow(
        TEST_ERR,
      );
    });
  });
  describe('create', () => {
    it('should create a single user', async () => {
      jest.spyOn(userService, 'create').mockResolvedValueOnce(mockUser);
      jest.spyOn(userService, 'save').mockResolvedValueOnce();
      jest.spyOn(walletService, 'generateAddressFor').mockResolvedValueOnce(mockWallet);

      await controller.create(response, mockUserDto);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual(JSON.parse(JSON.stringify(mockUser)));
    });

    it('should return 500 when userService fails', async () => {
      jest.spyOn(userService, 'create').mockImplementationOnce(() => {
        throw TEST_ERR;
      });

      await expect(controller.create(response, mockUserDto)).rejects.toThrow(
        TEST_ERR,
      );
    });
  });
});
