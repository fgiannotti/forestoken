import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService, PaymentsServiceError } from './payments.service';
import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';

interface AxiosMock extends AxiosStatic {
  // eslint-disable-next-line @typescript-eslint/ban-types
  mockImplementation: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  mockClear: Function;
}

jest.mock('axios');
const mockedAxios = axios.request as AxiosMock;

describe('PaymentsService', () => {
  let service: PaymentsService;
  const amount = 103.5;
  const receiverId = '1';
  process.env.BASE_PAYPAL_URL = 'https://api-m.sandbox.paypal.com/v1';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();
    service = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    mockedAxios.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should perform a transfer using paypal', async () => {
    mockedAxios.mockImplementation((args: AxiosRequestConfig) => {
      if (args.url.includes('oauth2/token')) {
        return Promise.resolve({ data: PAYPAL_GET_OAUTH_TOKEN_RESPONSE_MOCK });
      }
      if (args.url.includes('/payments/payouts') && args.method === 'POST') {
        return Promise.resolve({ data: PAYPAL_PAYOUT_RESPONSE_PENDING_MOCK });
      }
      if (args.url.includes('/payments/payouts') && args.method === 'GET') {
        return Promise.resolve({ data: PAYPAL_PAYOUT_RESPONSE_SUCCESS_MOCK });
      }
    });
    const paypalPaymentId = await service.transfer(amount, receiverId);
    expect(paypalPaymentId).toEqual('8F99Y6RCUP32L');
    expect(mockedAxios).toHaveBeenNthCalledWith(2, {
      data: {
        sender_batch_header: expect.anything(),
        items: [
          {
            recipient_type: 'EMAIL',
            amount: { value: amount.toString(), currency: 'USD' },
            receiver: 'comercio-forestoken@business.example.com',
          },
        ],
      },
      headers: expect.anything(),
      method: 'POST',
      url: 'https://api-m.sandbox.paypal.com/v1/payments/payouts',
    });
  });

  it('should fail if transfer is denied', async () => {
    mockedAxios.mockImplementation((args: AxiosRequestConfig) => {
      if (args.url.includes('oauth2/token')) {
        return Promise.resolve({ data: PAYPAL_GET_OAUTH_TOKEN_RESPONSE_MOCK });
      }
      if (args.url.includes('/payments/payouts') && args.method === 'POST') {
        return Promise.resolve({ data: PAYPAL_PAYOUT_RESPONSE_PENDING_MOCK });
      }
      if (args.url.includes('/payments/payouts') && args.method === 'GET') {
        return Promise.resolve({ data: PAYPAL_PAYOUT_RESPONSE_DENIED_MOCK });
      }
    });
    await expect(service.transfer(amount, receiverId)).rejects.toThrow(
      PaymentsServiceError,
    );
    expect(mockedAxios).toHaveBeenCalledTimes(3); //first one is the mock setup
    expect(mockedAxios).toHaveBeenNthCalledWith(2, {
      data: {
        sender_batch_header: expect.anything(),
        items: [
          {
            recipient_type: 'EMAIL',
            amount: { value: amount.toString(), currency: 'USD' },
            receiver: 'comercio-forestoken@business.example.com',
          },
        ],
      },
      headers: expect.anything(),
      method: 'POST',
      url: 'https://api-m.sandbox.paypal.com/v1/payments/payouts',
    });
  });

  it('should fail if transfer is invalid', async () => {
    mockedAxios.mockImplementation((args: AxiosRequestConfig) => {
      if (args.url.includes('oauth2/token')) {
        return Promise.resolve({ data: PAYPAL_GET_OAUTH_TOKEN_RESPONSE_MOCK });
      }
      if (args.url.includes('/payments/payouts') && args.method === 'POST') {
        return Promise.resolve({
          status: 400,
          data: PAYPAL_PAYOUT_RESPONSE_INVALID_RECEIVER,
        });
      }
    });
    await expect(service.transfer(amount, receiverId)).rejects.toThrow(
      PaymentsServiceError,
    );
  });
});

const PAYPAL_GET_OAUTH_TOKEN_RESPONSE_MOCK = {
  scope:
    'https://uri.paypal.com/services/customer/partner-referrals/readwrite https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/vault/payment-tokens/read',
  access_token:
    'A21AAJpZLZRsjA3Qtk-U7EUGG2g2T1KLo4fsX-iYycaXQ0Ret7JK4k_8q8wmc2DkpVbHHj9Kl7eio54B3swK78nRNlVZ-kWDw',
  token_type: 'Bearer',
  app_id: 'APP-80W284485P519543T',
  expires_in: 32400,
  nonce: '2022-10-24T21:18:35ZAJWKEfrYkBtk-xhprLrkyF3Bf4Zz0lr0GEcHZMQBZys',
};

const PAYPAL_PAYOUT_RESPONSE_PENDING_MOCK = JSON.parse(`
  {
    "batch_header": {
        "payout_batch_id": "8F99Y6RCUP32L",
        "batch_status": "PENDING",
        "sender_batch_header": {
            "sender_batch_id": "random2",
            "email_subject": "You have a payout!",
            "email_message": "You have received a payout! Thanks for using our service!"
        }
    },
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v1/payments/payouts/8F99Y6RCUP32L",
            "rel": "self",
            "method": "GET",
            "encType": "application/json"
        }
    ]
}`);

const PAYPAL_PAYOUT_RESPONSE_SUCCESS_MOCK = JSON.parse(`
  {
    "batch_header": {
        "payout_batch_id": "8F99Y6RCUP32L",
        "batch_status": "SUCCESS",
        "time_created": "2022-10-24T21:22:58Z",
        "time_completed": "2022-10-24T21:22:59Z",
        "time_closed": "2022-10-24T21:22:59Z",
        "sender_batch_header": {
            "sender_batch_id": "random2",
            "email_subject": "You have a payout!",
            "email_message": "You have received a payout! Thanks for using our service!"
        },
        "funding_source": "BALANCE",
        "amount": {
            "currency": "USD",
            "value": "5.00"
        },
        "fees": {
            "currency": "USD",
            "value": "0.25"
        }
    },
    "items": [
        {
            "payout_item_id": "HMKMGGYFNPU9A",
            "transaction_id": "5T9485015D906320B",
            "activity_id": "2LB9639696375670T",
            "transaction_status": "SUCCESS",
            "payout_item_fee": {
                "currency": "USD",
                "value": "0.25"
            },
            "payout_batch_id": "8F99Y6RCUP32L",
            "payout_item": {
                "recipient_type": "EMAIL",
                "amount": {
                    "currency": "USD",
                    "value": "5.00"
                },
                "note": "Thanks for your patronage!",
                "receiver": "comercio-forestoken@business.example.com",
                "sender_item_id": "201403140001",
                "recipient_wallet": "PAYPAL"
            },
            "time_processed": "2022-10-24T21:22:59Z",
            "links": [
                {
                    "href": "https://api.sandbox.paypal.com/v1/payments/payouts-item/HMKMGGYFNPU9A",
                    "rel": "item",
                    "method": "GET",
                    "encType": "application/json"
                }
            ]
        }
    ],
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v1/payments/payouts/8F99Y6RCUP32L?page_size=1000&page=1",
            "rel": "self",
            "method": "GET",
            "encType": "application/json"
        }
    ]
}`);

const PAYPAL_PAYOUT_RESPONSE_DENIED_MOCK = JSON.parse(`{
    "batch_header": {
        "payout_batch_id": "87FVC3NPD6Y8J",
        "batch_status": "DENIED",
        "time_created": "2017-08-22T15:18:48Z",
        "sender_batch_header": {
            "sender_batch_id": "API-1556",
            "email_subject": "Test batch status"
        },
        "amount": {
            "currency": "SGD",
            "value": "2580.00"
        },
        "fees": {
            "currency": "SGD",
            "value": "0.00"
        }
    },
    "items": [
        {
            "payout_item_id": "FYXYDFKV795Z2",
            "transaction_status": "FAILED",
            "payout_item_fee": {
                "currency": "SGD",
                "value": "0.00"
            },
            "payout_batch_id": "87FVC3NPD6Y8J",
            "payout_item": {
                "recipient_type": "EMAIL",
                "amount": {
                    "currency": "SGD",
                    "value": "2580.00"
                },
                "note": "payout to receiver test1",
                "receiver": "bjonny-us@paypal.com",
                "sender_item_id": "ID-30"
            },
            "errors": {
                "name": "NON_HOLDING_CURRENCY",
                "message": "Balance not available in the specified currency",
                "information_link": "https://developer.paypal.com/docs/api/payments.payouts-batch/#errors",
                "details": []
            },
            "links": [
                {
                    "href": "https://api.sandbox.paypal.com/v1/payments/payouts-item/FYXYDFKV795Z2",
                    "rel": "item",
                    "method": "GET",
                    "encType": "application/json"
                }
            ]
        }
    ],
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v1/payments/payouts/87FVC3NPD6Y8J",
            "rel": "self",
            "method": "GET",
            "encType": "application/json"
        }
    ]
}`);

const PAYPAL_PAYOUT_RESPONSE_INVALID_RECEIVER = JSON.parse(`{
  "name": "VALIDATION_ERROR",
  "message": "Invalid request - see details",
  "debug_id": "9c7157695240b",
  "information_link": "https://developer.paypal.com/docs/api/payments.payouts-batch/#errors",
  "details": [
  {
    "field": "items[0].receiver",
    "location": "body",
    "issue": "Receiver is invalid or does not match with type"
  }
],
  "links": []
}`);
