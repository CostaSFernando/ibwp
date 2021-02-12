import { Module } from '@nestjs/common';
import { DealService } from 'src/services/deal/deal.service';
import { PedidoService } from 'src/services/pedido/pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido, PedidoSchema } from './pedido';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Pedido.name, schema: PedidoSchema }],
      'pedido',
    ),
  ],
  controllers: [PedidoController],
  providers: [PedidoService, DealService],
})
export class PedidoModule {}
