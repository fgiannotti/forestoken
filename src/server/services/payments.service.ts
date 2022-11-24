import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { randomUUID } from 'crypto';

type PaypalGetOAuthTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  app_id: string;
};

type PaypalPayoutResponse = {
  payout_batch_id: string;
  batch_status: string;
};

export class PaymentsServiceError extends Error {
  constructor(error, message: string) {
    const errorMessage = error.message !== undefined ? error.message : '';
    const extraErrorData =
      error.response !== undefined && error.response.data !== undefined
        ? error.response.data
        : '';
    super(message + errorMessage + extraErrorData);
    this.name = 'PaymentsServiceError';
  }
}

@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name);
  private BASE_PAYPAL_URL = process.env.BASE_PAYPAL_URL;
  private PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  DOLAR_CRYPTO = 306;
  async transfer(amount: number, receiverId: string): Promise<string> {
    // Get Oauth token
    const token: string = await this.getOAuthToken();
    // create paypal payout
    const payoutResponse: PaypalPayoutResponse = await this.createPaypalPayout(
      token,
      amount / this.getDolarCrypto(),
      receiverId,
    );

    // SLEEP 2 SECONDS, PAYPAL NEEDS SOME TIME TO PROCESS THE PAYOUT
    await new Promise((r) => setTimeout(r, 2000));

    const payout: PaypalPayoutResponse = await this.getPayout(
      token,
      payoutResponse.payout_batch_id,
    );
    this.checkPayoutStatus(payout);

    return payoutResponse.payout_batch_id;
  }

  getDolarCrypto() {
    return this.DOLAR_CRYPTO;
  }

  private checkPayoutStatus(payout: PaypalPayoutResponse) {
    if (payout.batch_status == 'DENIED') {
      const payoutString = JSON.stringify(payout, null, 4);
      this.logger.error('Payout denied: ' + payoutString);
      throw new PaymentsServiceError(Error('Payout denied. '), payoutString);
    }
  }

  private async getOAuthToken(): Promise<string> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + this.PAYPAL_SECRET,
      },
      data: 'grant_type=client_credentials',
      url: this.BASE_PAYPAL_URL + '/oauth2/token',
    };

    try {
      // In .data we have the response body Typed as PaypalGetOAuthTokenResponse
      const response: AxiosResponse =
        await axios.request<PaypalGetOAuthTokenResponse>(options);
      this.logger.log(
        'PaypalGetOAuthTokenResponse: ' +
          JSON.stringify(response.data, null, 4),
      );

      if (this.badStatus(response.status)) {
        throw Error(
          'Bad status: ' +
            response.status +
            ' ' +
            JSON.stringify(response.data),
        );
      }

      if (response.data.access_token === undefined) {
        throw new Error(
          'No access token received in response: ' +
            JSON.stringify(response.data, null, 4),
        );
      }

      return response.data.access_token;
    } catch (error) {
      this.logger.error(
        'unexpected error getting paypal oauth: ' +
          JSON.stringify(error, null, 4),
      );
      throw new PaymentsServiceError(
        error,
        '. Unexpected error fetching paypal oauth: ',
      );
    }
  }

  private async createPaypalPayout(
    authToken: string,
    amount: number,
    receiverId: string,
  ): Promise<PaypalPayoutResponse> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        sender_batch_header: {
          sender_batch_id: randomUUID(),
          email_subject: 'Pago mediante Forestoken',
        },
        items: [
          {
            recipient_type: 'EMAIL',
            amount: {
              value: amount.toFixed(2),
              currency: 'USD',
            },
            receiver: 'comercio-forestoken@business.example.com',
          },
        ],
      },
      url: this.BASE_PAYPAL_URL + '/payments/payouts',
    };

    try {
      // In .data we have the response body Typed as PaypalCreatePayoutResponse
      const response: AxiosResponse = await axios.request<PaypalPayoutResponse>(
        options,
      );
      this.logger.log(
        'PaypalPayoutResponse: ' + JSON.stringify(response.data, null, 4),
      );

      if (this.badStatus(response.status)) {
        throw Error(
          'Bad status: ' +
            response.status +
            ' ' +
            JSON.stringify(response.data),
        );
      }

      if (response.data.batch_header === undefined) {
        throw new Error(
          'No batch_header received in response: ' +
            JSON.stringify(response.data, null, 4),
        );
      }
      return response.data.batch_header;
    } catch (error) {
      this.logger.error(
        'POST unexpected error creating paypal payout: ' +
          JSON.stringify(error, null, 4),
      );
      throw new PaymentsServiceError(
        error,
        ' [Unexpected error creating paypal payout]',
      );
    }
  }

  private async getPayout(
    authToken: string,
    payout_batch_id: string,
  ): Promise<PaypalPayoutResponse> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      url: this.BASE_PAYPAL_URL + '/payments/payouts/' + payout_batch_id,
    };

    try {
      // In .data we have the response body Typed as PaypalCreatePayoutResponse
      const response: AxiosResponse = await axios.request<PaypalPayoutResponse>(
        options,
      );
      this.logger.log(
        'GET PaypalPayoutResponse: ' + JSON.stringify(response.data, null, 4),
      );

      if (this.badStatus(response.status)) {
        throw Error(
          'Bad status: ' +
            response.status +
            ' ' +
            JSON.stringify(response.data),
        );
      }

      if (response.data.batch_header === undefined) {
        throw new Error(
          'No batch_header received in response: ' +
            JSON.stringify(response.data, null, 4),
        );
      }

      return response.data.batch_header;
    } catch (error) {
      this.logger.error(
        'GET unexpected error getting paypal payout: ' +
          JSON.stringify(error, null, 4),
      );
      throw new PaymentsServiceError(
        error,
        'Unexpected error getting paypal payout: ',
      );
    }
  }

  private badStatus(status: number) {
    return status >= 400;
  }
}
