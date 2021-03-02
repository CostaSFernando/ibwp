import { HttpService, Injectable } from '@nestjs/common';
import { IDeals } from './deal.model';

@Injectable()
export class DealService {
  constructor(private httpService: HttpService) {}

  async getDeals(): Promise<IDeals> {
    const res = await this.httpService
      .get<IDeals>(
        `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${process.env.PIPEDRIVEKEY}`,
      )
      .toPromise();

    return res.data;
  }
}
