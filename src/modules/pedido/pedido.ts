import { Document } from "mongoose"

export class Pedido extends Document {
    pedido: {
        cliente: {
            nome: String,
        },
        vendedor: String,
        data_prevista: Date,
        itens: {
            item: [
                {
                    vlr_unit: String,
                    qtde: String,
                    descricao: String,
                    codigo: String
                }
            ]
        },
        parcelas: {
            parcela:[
                {
                    dias: Number,
                    vlr: String,
                    data: String
                }
            ]
        }
    }
}
