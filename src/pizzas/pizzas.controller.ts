import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get('list')
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get('details/:id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(+id);
  }

  @Post('add')
  create(@Body() body: { name: string; price: number }) {
    return this.pizzasService.create(body);
  }
}
