import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoWR } from '../entities/powr.entity';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


type PaypalGetOAuthTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: string;
  app_id: string;
};

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PoWR)
    private repository: Repository<PoWR>,
  ) {
  }

  async createPayment() {
    // Get Oauth token
    const token: string = await this.getOAuthToken();
    // create paypal payout

    // get payout status and check if OK

  }

  private async getOAuthToken(): Promise<string> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QVZGZkhxV0Rvb2VRLTFqNG5vTkhYejAxSFBDT2RCNjByV2hpNnU5SEYwWGlBT2lZU1E1dHhuTTlSSGQtcTRBZ0IyWTNsWHVZYUtvelVVZUs6RUdTTENuMG9wY1JDbWhpd2d3clNqa3dNbTRPSlU0WDlTMTEyU19Tb01qdTFBaEIxOGJTaHpud2xRbk8wZ01WclFNMEpWNVhiZkVHTkI1SGQ='},
      data: 'grant_type=client_credentials',
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    };

    try {
      //const data: CreateUserResponse
      const response: AxiosResponse = await axios.request<PaypalGetOAuthTokenResponse>(options);

      console.log(JSON.stringify(response.data, null, 4));
      return response.data.access_token
    } catch (error) {
      console.log('unexpected error fetching oauth paypal token: ', error);
      throw error;
    }
  }

}
