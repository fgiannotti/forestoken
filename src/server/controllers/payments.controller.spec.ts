import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { createResponse, MockResponse } from 'node-mocks-http';
import { MovementsService } from '../services/movements.service';
import { PaymentsService } from '../services/payments.service';
import { PaymentsController } from './payments.controller';
import {
  ConsumablePowr,
  EventInfo,
  TokensService,
} from '../services/tokens.service';
import { PaymentDto } from '../dtos/payment.dto';
import { WalletsService } from '../services/wallets.service';
import { createMockAffiliate, createMockWallet } from '../../test/test-utils';
import { AffiliatesService } from '../services/affiliates.service';

const TEST_ERR = Error('F');

function createMockPowrEvent(
  eventType = 'LogPowrCreation',
  amount = '100',
  address = '0x123123',
): EventInfo {
  if (eventType !== 'LogPowrCreation' && eventType !== 'LogPowrWithdraw') {
    throw new Error('Invalid event type for test mock event');
  }

  return {
    returnValues: {
      saleContract: '0x1',
      depositCert: '0x2',
      collectionRightsContract: '0x3',
      amount: amount,
      walletId: address,
    },
    transactionHash: '0x4',
    blockNumber: 1,
    blockHash: '0x5',
    address: '0x6',
    event: eventType,
  };
}

function createMockConsumablePowrs(): ConsumablePowr[] {
  return [
    {
      mintedPoWR: createMockPowrEvent('LogPowrCreation', '100'),
      relatedBurns: [createMockPowrEvent('LogPowrWithdraw', '50')],
      tokensStillAvailable: 10,
    },
  ];
}

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;
  let tokensService: TokensService;
  let movementsService: MovementsService;
  let affiliatesService: AffiliatesService;
  let walletsService: WalletsService;
  let response: MockResponse<Response>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: {
            transfer: jest.fn().mockImplementation(),
          },
        },
        {
          provide: TokensService,
          useValue: {
            getConsumablesPowr: jest.fn().mockImplementation(),
            burnTokensWithPowr: jest.fn().mockImplementation(),
          },
        },
        {
          provide: MovementsService,
          useValue: {
            create: jest.fn().mockImplementation(),
          },
        },
        {
          provide: WalletsService,
          useValue: {
            findByUserId: jest.fn().mockImplementation(),
          },
        },
        {
          provide: AffiliatesService,
          useValue: {
            findOne: jest.fn().mockImplementation(),
          },
        },
      ],
    }).compile();
    paymentsService = module.get<PaymentsService>(PaymentsService);
    tokensService = module.get<TokensService>(TokensService);
    movementsService = module.get<MovementsService>(MovementsService);
    affiliatesService = module.get<AffiliatesService>(AffiliatesService);
    walletsService = module.get<WalletsService>(WalletsService);
    controller = module.get<PaymentsController>(PaymentsController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create tests', () => {
    const mockBody: PaymentDto = {
      amount_to_pay: 10,
      tokens_consumed: 5,
      affiliate_id: 'uuid',
      user_id: 1,
    };

    it('should return an array of users and OK', async () => {
      jest
        .spyOn(walletsService, 'findByUserId')
        .mockResolvedValueOnce(createMockWallet());
      jest
        .spyOn(tokensService, 'getConsumablesPowr')
        .mockResolvedValueOnce(createMockConsumablePowrs());
      jest
        .spyOn(tokensService, 'burnTokensWithPowr')
        .mockResolvedValueOnce('0x123123');
      jest
        .spyOn(paymentsService, 'transfer')
        .mockResolvedValueOnce('paypal-id');
      jest.spyOn(affiliatesService, 'findOne').mockImplementation(() => {
        return createMockAffiliate();
      });
      await controller.createPayment(response, mockBody);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual('paypal-id');
    });

    it('should return 500 when paymentsService fails', async () => {
      jest
        .spyOn(walletsService, 'findByUserId')
        .mockResolvedValueOnce(createMockWallet());
      jest
        .spyOn(tokensService, 'getConsumablesPowr')
        .mockResolvedValueOnce(createMockConsumablePowrs());
      jest
        .spyOn(tokensService, 'burnTokensWithPowr')
        .mockResolvedValueOnce('0x123123');
      jest.spyOn(paymentsService, 'transfer').mockImplementationOnce(() => {
        throw TEST_ERR;
      });
      await expect(
        controller.createPayment(response, mockBody),
      ).rejects.toThrow(TEST_ERR);
    });
  });
});
