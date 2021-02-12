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
    const retorno = await this.pedidoService
      .createPedidoWithDeal(deals)
      .catch((error) => {
        // console.log(error);
        console.log(error.response.data.retorno);
      });

    return retorno;

    // Salvar no mongoDB
  }
}
