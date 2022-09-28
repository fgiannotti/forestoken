import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { createResponse, MockResponse } from 'node-mocks-http';
import { UserDto } from '../dtos/user.dto';
import { createMockUser, createMockUserDto } from "../../../test/test-utils";

const TEST_ERR = Error('F');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let response: MockResponse<Response>;
  let mockUser: User;
  let mockUserDto: UserDto;

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
          },
        },
      ],
    }).compile();
    mockUser = createMockUser();
    mockUserDto = createMockUserDto();
    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll tests', () => {
    it('should return an array of users and OK', async () => {
      const list: User[] = [mockUser];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(list);

      await controller.findAll(response);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual(list);
    });

    it('should return 500 when service fails', async () => {
      jest.spyOn(service, 'findAll').mockImplementationOnce(() => {
        throw TEST_ERR;
      });
      await expect(controller.findAll(response)).rejects.toThrow(TEST_ERR);
    });
  });

  describe('getById', () => {
    it('should get a single user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockUser);

      await controller.findById(response, 123);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual(mockUser);
    });

    it('should return 500 when service fails', async () => {
      jest.spyOn(service, 'findOne').mockImplementationOnce(() => {
        throw TEST_ERR;
      });

      await expect(controller.findById(response, 123)).rejects.toThrow(
        TEST_ERR,
      );
    });
  });
  describe('create', () => {
    it('should create a single user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockUser);

      await controller.findById(response, 123);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual(mockUser);
    });

    it('should return 500 when service fails', async () => {
      jest.spyOn(service, 'create').mockImplementationOnce(() => {
        throw TEST_ERR;
      });

      await expect(controller.create(response, mockUserDto)).rejects.toThrow(
        TEST_ERR,
      );
    });
  });
});
