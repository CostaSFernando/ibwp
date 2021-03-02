import { HttpModule, HttpService, Module } from '@nestjs/common';
import { PedidoService } from 'src/services/pedido/pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [HttpModule, HttpService],
  controllers: [PedidoController],
  providers: [ PedidoService]
})
export class PedidoModule {}
