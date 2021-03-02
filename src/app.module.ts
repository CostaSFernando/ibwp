import { HttpModule, HttpService, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidoModule } from './modules/pedido/pedido.module';
import { DealService } from './services/deal/deal.service';

@Module({
  imports: [HttpModule, PedidoModule, HttpService, AppService ,DealService],
  controllers: [AppController],
  providers: [HttpService, AppService, DealService],
})
export class AppModule {}
