import { HttpModule, HttpService, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidoModule } from './modules/pedido/pedido.module';
import { PedidoService } from './services/pedido/pedido.service';
import { DealService } from './services/deal/deal.service';

@Module({
  imports: [HttpModule, PedidoModule],
  controllers: [AppController],
  providers: [HttpService, AppService, PedidoService, DealService],
})
export class AppModule {}
