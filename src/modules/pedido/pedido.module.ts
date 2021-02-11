import { HttpModule, HttpService, Module } from '@nestjs/common';
import { DealService } from 'src/services/deal/deal.service';
import { PedidoService } from 'src/services/pedido/pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [],
  controllers: [PedidoController],
  providers: [PedidoService, DealService]
})
export class PedidoModule {}
