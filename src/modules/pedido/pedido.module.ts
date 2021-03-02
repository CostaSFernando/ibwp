import { HttpModule, Module } from '@nestjs/common';
import { PedidoService } from 'src/services/pedido/pedido.service';
import { PedidoController } from './pedido.controller';
import { DealService } from '../../services/deal/deal.service';

@Module({
  imports: [HttpModule],
  controllers: [PedidoController],
  providers: [PedidoService, DealService],
})
export class PedidoModule {}
