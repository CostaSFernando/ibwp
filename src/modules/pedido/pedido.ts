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
  @Prop({ type: Parcela })
  parcela: Parcela[];
}

@Schema()
export class PedidoBase {
  @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Cliente' })
  cliente: Cliente;
  @Prop()
  vendedor: string;
  @Prop({ type: Date })
  data_prevista: Date;
  @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Itens' })
  itens: Itens;
  @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Parcelas' })
  parcelas: Parcelas;
}

@Schema()
export class Agregation {
  @Prop({ type: PedidoBase })
  pedido: PedidoBase;
}
@Schema()
export class Pedido {
  @Prop()
  data_ganho: string;

  @Prop()
  valor_total: number;

  @Prop({ type: Agregation })
  data: Agregation[];
}
export const PedidoSchema = SchemaFactory.createForClass(Pedido);
