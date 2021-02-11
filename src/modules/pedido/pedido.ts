import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongo } from 'mongoose';

export type PedidoDocument = Pedido & Document;

@Schema()
class Cliente {
  @Prop()
  nome: string;
}

@Schema()
class PropItens {
  @Prop()
  vlr_unit: string;
  @Prop()
  qtde: string;
  @Prop()
  descricao: string;
  @Prop()
  codigo: string;
}

@Schema()
class Itens {
  @Prop({ type: [{ type: SchemaMongo.Types.ObjectId, ref: 'PropItens' }] })
  item: PropItens[];
}

@Schema()
class Parcela {
  @Prop()
  dias: number;
  @Prop()
  vlr: string;
  @Prop()
  data: string;
}

@Schema()
class Parcelas {
  @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Parcela' })
  parcela: Parcela;
}

@Schema()
export class PedidoBase {
  @Prop({ type: Cliente })
  cliente: Cliente;
  @Prop()
  vendedor: string;
  @Prop()
  data_prevista: Date;

  @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Itens' })
  itens: Itens;
  @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Parcelas' })
  parcelas: Parcelas;
}

@Schema()
export class Pedido {
  @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'PedidoBase' })
  pedido: PedidoBase;
}
export const PedidoSchema = SchemaFactory.createForClass(Pedido);
