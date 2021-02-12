import { Controller, Get, Post } from '@nestjs/common';
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
    const retorno = await this.pedidoService
      .createPedidoWithDeal(deals)
      .catch((error) => {
        console.error(error.response.data.retorno);
      });
    return retorno;
  }

  @Get()
  async getPedidos() {
    return await this.pedidoService.getAllPedidos();
  }
}
