import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IDeals } from '../deal/deal.model';
import { IpostPedido } from './pedido.model';
import { InjectModel } from '@nestjs/mongoose';
//  import { map } from 'rxjs/operators';
import * as convert from 'xml-js';
import axios from 'axios';
import * as qs from 'qs';
import {
  Pedido as PedidoSchema,
  PedidoDocument,
} from '../../modules/pedido/pedido';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(PedidoSchema.name)
    private readonly pedidoModel: Model<PedidoDocument>,
  ) {}
  async createPedidoWithDeal(deal: IDeals): Promise<any> {
    const responses = deal.data.map(async (iDeal) => {
      const pedido: IpostPedido = {
        pedido: {
          cliente: {
            nome: iDeal.person_name,
          },
          vendedor: iDeal.owner_name,
          data_prevista: new Date(iDeal.close_time),
          itens: {
            item: [
              {
                vlr_unit: '' + iDeal.products_count / iDeal.weighted_value,
                qtde: '' + iDeal.products_count,
                descricao: iDeal.title,
                codigo: '' + iDeal.id,
              },
            ],
          },
          parcelas: {
            parcela: [
              {
                dias: 1,
                vlr: '' + iDeal.weighted_value,
                data: iDeal.expected_close_date,
              },
            ],
          },
        },
      };
      let xml = this.createXml(pedido);

      xml = '<?xml version="1.0" encoding="UTF-8"?>' + xml;
      const payload = qs.stringify({
        apikey: process.env.BLINGKEY,
        xml,
      });

      const { data } = await axios.request({
        method: 'post',
        url: 'https://bling.com.br/Api/v2/pedido/json/',
        data: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (data.retorno.erros) {
        throw new Error(`O Pedido do ${iDeal.person_name} não foi cadastrado.`);
      }
      const newPedido = new this.pedidoModel(pedido);
      return await newPedido.save();
    });

    //@ts-ignore
    return Promise.allSettled(responses);
  }

  private createXml(object: any) {
    return convert.js2xml(object, {
      compact: true,
      ignoreComment: false,
      spaces: 0,
    });
  }
}
