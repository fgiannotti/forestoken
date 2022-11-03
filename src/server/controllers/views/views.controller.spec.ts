import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { createResponse, MockResponse } from 'node-mocks-http';
import {
  createMockMovement,
  createMockUser,
  createMockWallet,
} from '../../../test/test-utils';
import { Wallet } from '../../entities/wallet.entity';
import { ViewsController } from './views.controller';
import { TokensService } from '../../services/tokens.service';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { MovementsService } from '../../services/movements.service';
import { UsersService } from '../../services/users.service';

const TEST_ERR = Error('F');

describe('ViewsController', () => {
  let controller: ViewsController;
  let tokensService: TokensService;
  let usersService: UsersService;
  let movementsService: MovementsService;
  let response: MockResponse<Response>;
  let mockWallet: Wallet;
  const validRequest = { headers: { user_id: '123' } } as any as Request;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewsController],
      providers: [
        {
          provide: TokensService,
          useValue: {
            balanceOf: jest.fn().mockImplementation(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockImplementation(),
          },
        },
        {
          provide: MovementsService,
          useValue: {
            findByUserId: jest.fn().mockImplementation(),
          },
        },
      ],
    }).compile();
    mockWallet = createMockWallet();
    tokensService = module.get<TokensService>(TokensService);
    usersService = module.get<UsersService>(UsersService);
    movementsService = module.get<MovementsService>(MovementsService);
    controller = module.get<ViewsController>(ViewsController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('home view endpoint tests', () => {
    it('should return the home with prices formatted', async () => {
      jest.spyOn(tokensService, 'balanceOf').mockResolvedValueOnce(10);
      jest
        .spyOn(usersService, 'findOne')
        .mockResolvedValueOnce(createMockUser());
      jest
        .spyOn(movementsService, 'findByUserId')
        .mockResolvedValueOnce([createMockMovement()]);

      await controller.home(response, validRequest);
      //expects
      expect(response.statusCode).toBe(200);

      const responseJson = response._getJSONData();
      expect(responseJson).toHaveProperty('money');
      expect(responseJson).toHaveProperty('tokens');
      expect(responseJson.money).toEqual('$ 28,500');
      expect(responseJson.tokens).toEqual('10');
    });
    // fix this when user_id header is not used anymore
    it('should return an UnauthorizedException if theres not user id', async () => {
      const mockRequest = { headers: { NOT_USER_ID: '1' } } as any as Request;
      await expect(controller.home(response, mockRequest)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return an TEST_ERR if user wallet retrieval fails', async () => {
      jest
        .spyOn(usersService, 'findOne')
        .mockResolvedValueOnce(createMockUser());
      jest.spyOn(tokensService, 'balanceOf').mockImplementationOnce(() => {
        throw TEST_ERR;
      });
      await expect(controller.home(response, validRequest)).rejects.toThrow(
        TEST_ERR,
      );
    });

    it('should return an TEST_ERR if balance retrieval fails', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementationOnce(() => {
        throw TEST_ERR;
      });
      await expect(controller.home(response, validRequest)).rejects.toThrow(
        TEST_ERR,
      );
    });
  });
});
