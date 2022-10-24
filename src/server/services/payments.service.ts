import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoWR } from '../entities/powr.entity';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { randomUUID } from 'crypto';
import { time } from '@motionone/utils';


type PaypalGetOAuthTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: string;
  app_id: string;
};

type PaypalPayoutResponse = {
  batch_header: {
    payout_batch_id: string,
    batch_status: string,
  };
};

@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name);
  private BASE_PAYPAL_URL = 'https://api-m.sandbox.paypal.com/v1';
  private PAYPAL_SECRET = 'QVZGZkhxV0Rvb2VRLTFqNG5vTkhYejAxSFBDT2RCNjByV2hpNnU5SEYwWGlBT2lZU1E1dHhuTTlSSGQtcTRBZ0IyWTNsWHVZYUtvelVVZUs6RUdTTENuMG9wY1JDbWhpd2d3clNqa3dNbTRPSlU0WDlTMTEyU19Tb01qdTFBaEIxOGJTaHpud2xRbk8wZ01WclFNMEpWNVhiZkVHTkI1SGQ=';

  async createPayment(amount: number, receiverId: string): Promise<string> {
    // Get Oauth token
    const token: string = await this.getOAuthToken();
    // create paypal payout
    const payoutResponse: PaypalPayoutResponse = await this.createPaypalPayout(token, amount, receiverId);

    // SLEEP 2 SECONDS, PAYPAL NEEDS SOME TIME TO PROCESS THE PAYOUT
    await new Promise(r => setTimeout(r, 2000));

    if (payoutResponse.batch_header.batch_status == "PENDING") {
      // check payout status
      const payout: PaypalPayoutResponse = await this.getPayout(token, payoutResponse.batch_header.payout_batch_id);
      if (payout.batch_header.batch_status == "DENIED") {
        this.logger.error("Payout denied: " + JSON.stringify(payout, null, 4));
        throw new Error("Payout denied: " + JSON.stringify(payout, null, 4));
      }
    }
    return payoutResponse.batch_header.payout_batch_id
  }

  private async getOAuthToken(): Promise<string> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + this.PAYPAL_SECRET},
      data: 'grant_type=client_credentials',
      url: this.BASE_PAYPAL_URL + '/oauth2/token',
    };

    try {
      // In .data we have the response body Typed as PaypalGetOAuthTokenResponse
      const response: AxiosResponse = await axios.request<PaypalGetOAuthTokenResponse>(options);

      this.logger.log("PaypalGetOAuthTokenResponse: " + JSON.stringify(response.data, null, 4));
      return response.data.access_token
    } catch (error) {
      throw new Error(error + 'Unexpected error fetching paypal oauth: ' + JSON.stringify(error.response.data));
    }
  }

  private async createPaypalPayout(authToken: string, amount: number, receiverId: string): Promise<PaypalPayoutResponse> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      data: {
        "sender_batch_header": {
          "sender_batch_id": randomUUID(),
          "email_subject": "Pago mediante Forestoken"
        },
        "items": [
          {
            "recipient_type": "EMAIL",
            "amount": {
              "value": amount.toString(),
              "currency": "USD"
            },
            "receiver": 'comercio-forestoken@business.example.com',
          }
        ]
      },
      url: this.BASE_PAYPAL_URL + '/payments/payouts',
    };

    try {
      // In .data we have the response body Typed as PaypalCreatePayoutResponse
      const response: AxiosResponse = await axios.request<PaypalPayoutResponse>(options);

      this.logger.log("PaypalPayoutResponse: " + JSON.stringify(response.data, null, 4));
      return response.data
    } catch (error) {
      this.logger.error('POST unexpected error creating paypal payout: ' + JSON.stringify(error.response.data));
      throw new Error(error + 'Unexpected error creating paypal payout: ' + JSON.stringify(error.response.data));
    }
  }

  private async getPayout(authToken: string, payout_batch_id: string) {
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      url: this.BASE_PAYPAL_URL + '/payments/payouts/'+payout_batch_id,
    };

    try {
      // In .data we have the response body Typed as PaypalCreatePayoutResponse
      const response: AxiosResponse = await axios.request<PaypalPayoutResponse>(options);

      this.logger.log("GET PaypalPayoutResponse: " + JSON.stringify(response.data, null, 4));
      return response.data
    } catch (error) {
      throw new Error(error + 'Unexpected error getting paypal payout: ' + JSON.stringify(error.response.data));
    }
  }
}
