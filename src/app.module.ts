import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidoModule } from './modules/pedido/pedido.module';

@Module({
  imports: [HttpModule, PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
