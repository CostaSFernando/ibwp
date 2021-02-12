import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
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
    const deals = await this.dealService.getDeals();

    const retorno = await this.pedidoService
      .createPedidoWithDeal(deals)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
    return retorno.filter((pedido) => pedido.status !== 'rejected');
  }

  @Get()
  async getPedidos() {
    return await this.pedidoService.getAllPedidos();
  }
}
