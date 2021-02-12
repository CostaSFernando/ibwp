import { Injectable } from '@nestjs/common';
import { IDeals } from './deal.model';
import axios from 'axios';

@Injectable()
export class DealService {
  async getDeals(): Promise<IDeals> {
    const res = await axios.get<IDeals>(
      `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${process.env.PIPEDRIVEKEY}`,
    );

    return res.data;
  }
}
