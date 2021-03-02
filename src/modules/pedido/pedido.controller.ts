import { Controller, Post } from '@nestjs/common';
import { DealService } from 'src/services/deal/deal.service';
import { PedidoService } from 'src/services/pedido/pedido.service';

@Controller('pedido')
export class PedidoController {
  constructor(
    private pedidoService: PedidoService,
    private dealService: DealService,
  ) {}

  @Post()
  async integrationBlingToPipedrive() {
    // Buscar propostas ganhas pipe drive
    const deals = await this.dealService.getDeals();

    // Cadastrar propostas no Bling
    return this.pedidoService.createPedidoWithDeal(deals).catch((error) => {
      // console.log(error);
      console.log(error);
    });

    // Salvar no mongoDB
  }
}
