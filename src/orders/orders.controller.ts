import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('list')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('details/:id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}
