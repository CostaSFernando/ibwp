import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoModule } from './modules/pedido/pedido.module';

@Module({
  imports: [
    PedidoModule,
    MongooseModule.forRoot(process.env.URLMONGO, {
      connectionName: 'pedido',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
