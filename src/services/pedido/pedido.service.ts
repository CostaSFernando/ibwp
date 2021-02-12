import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IDeals } from '../deal/deal.model';
import { InjectModel } from '@nestjs/mongoose';
import * as convert from 'xml-js';
import axios from 'axios';
import * as qs from 'qs';
import { Pedido, Agregation } from '../../modules/pedido/pedido';
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
      const pedido: Agregation = {
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

      const dataWon = iDeal.won_time.split(' ')[0];

      const searchPedido = await this.pedidoModel.findOne({
        data_ganho: dataWon,
      });

      if (searchPedido) {
        console.log(searchPedido);

        searchPedido.data.push(pedido);
        return await this.pedidoModel.updateOne(
          { _id: searchPedido._id },
          {
            $set: {
              data: searchPedido.data,
              valor_total: searchPedido.valor_total + iDeal.weighted_value,
            },
          },
        );
      }
      const newPedido = new this.pedidoModel({
        data_ganho: dataWon,
        valor_total: 500000,
        data: [pedido],
      });

      return await newPedido.save();
    });

    //@ts-ignore
    return Promise.allSettled(responses);
  }

  async getAllPedidos() {
    return await this.pedidoModel.find();
  }

  private createXml(object: any) {
    return convert.js2xml(object, {
      compact: true,
      ignoreComment: false,
      spaces: 0,
    });
  }
}
