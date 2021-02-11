import { Injectable } from '@nestjs/common';
import { IDeals } from '../deal/deal.model';
import { IpostPedido, Pedido } from './pedido.model';

//  import { map } from 'rxjs/operators';
import * as convert from 'xml-js';
import axios from 'axios';
import * as qs from 'qs';


@Injectable()
export class PedidoService {

    constructor(
    ){}
    async createPedidoWithDeal(deal: IDeals): Promise<any> {
        
        const responses = deal.data.map( async iDeal => {
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
                                vlr_unit: '' + (iDeal.products_count / iDeal.weighted_value),
                                qtde: ('' + iDeal.products_count),
                                descricao: iDeal.title,
                                codigo: ('' + iDeal.id)
                            }
                        ]
                    },
                    parcelas: {
                        parcela:[
                            {
                                dias: 1,
                                vlr: '' + iDeal.weighted_value,
                                data: iDeal.expected_close_date
                            }
                        ]
                    }
                }
            };
            let xml = this.createXml(pedido);

            xml = '<?xml version="1.0" encoding="UTF-8"?>' + xml;
            const payload = qs.stringify({
                apikey: process.env.BLINGKEY,
                xml
            });

            const {data} = await axios.request({
                method: 'post',
                url: 'https://bling.com.br/Api/v2/pedido/json/',
                data: payload,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (data.retorno.erros) {
                throw new Error(`O Pedido do ${iDeal.person_name} não foi cadastrado.`);
            }
            
            return data;
            
        });

        //@ts-ignore
        return Promise.allSettled(responses);


        //return (await this.httpService.post<any>(`https://bling.com.br/Api/v2/pedido/json?xml=${encodeURI(pedidos)}&apikey=${process.env.BLINGKEY}`).pipe(
        //    map(response => response.data),
        //  ).toPromise());
    }

    //async findAll(): Promise<Pedido[]> {
    //    return await this.pedidoModel.find().exec();
    //  }


    private createXml(object: any) {
        return convert.js2xml(
            object,
            {compact: true, ignoreComment: false, spaces: 0}    
        );
    }
}
