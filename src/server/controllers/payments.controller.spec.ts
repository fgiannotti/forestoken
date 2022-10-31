import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { createResponse, MockResponse } from 'node-mocks-http';
import { MovementsService } from '../services/movements.service';
import { PaymentsService } from '../services/payments.service';
import { PaymentsController } from './payments.controller';
import { TokensService } from '../services/tokens.service';

const TEST_ERR = Error('F');

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;
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
          useValue: {},
        },
        {
          provide: MovementsService,
          useValue: {},
        },
      ],
    }).compile();
    paymentsService = module.get<PaymentsService>(PaymentsService);
    controller = module.get<PaymentsController>(PaymentsController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create tests', () => {
    const mockBody = { amount: 103.5, affiliateId: '1' };

    it('should return an array of users and OK', async () => {
      jest
        .spyOn(paymentsService, 'transfer')
        .mockResolvedValueOnce('paypal-id');

      await controller.createPayment(response, mockBody);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual('paypal-id');
    });

    it('should return 500 when paymentsService fails', async () => {
      jest.spyOn(paymentsService, 'transfer').mockImplementationOnce(() => {
        throw TEST_ERR;
      });
      await expect(
        controller.createPayment(response, mockBody),
      ).rejects.toThrow(TEST_ERR);
    });
  });
});
