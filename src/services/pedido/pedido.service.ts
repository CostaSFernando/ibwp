import { HttpService, Injectable } from '@nestjs/common';
import { IDeals } from '../deal/deal.model';
import { IpostPedido } from './pedido.model';
import { map } from 'rxjs/operators';
import * as convert from 'xml-js';

@Injectable()
export class PedidoService {
  constructor(private httpService: HttpService) {}

  async createPedidoWithDeal(deal: IDeals): Promise<any> {
    const pedidos = deal.data.reduce((acc, iDeal) => {
      const xml = convert.js2xml(
        {
          pedido: {
            cliente: {
              nome: iDeal.person_name,
            },
            vendedor: iDeal.owner_name,
            data_prevista: new Date(iDeal.close_time),
            itens: {
              item: [
                {
                  vlr_unit: '10',
                  qtde: '10',
                  descricao: 'teste',
                  codigo: '1',
                },
              ],
            },
          },
        } as IpostPedido,
        { compact: true, ignoreComment: false, spaces: 0 },
      );

      return (acc += xml);
    }, '<?xml version="1.0" encoding="UTF-8"?>');

    return await this.httpService
      .post<any>(
        `https://bling.com.br/Api/v2/pedido/json?xml=${encodeURI(
          pedidos,
        )}&apikey=${process.env.BLINGKEY}`,
      )
      .pipe(map((response) => response.data))
      .toPromise();
  }

  //async findAll(): Promise<Pedido[]> {
  //    return await this.pedidoModel.find().exec();
  //  }
}
