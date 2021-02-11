import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidoModule } from './modules/pedido/pedido.module';
import { PedidoService } from './services/pedido/pedido.service';
import { DealService } from './services/deal/deal.service';

@Module({
  imports: [PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
