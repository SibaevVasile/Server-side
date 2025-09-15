import { Controller, Get, Param } from '@nestjs/common';
import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get('details/:id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(+id);
  }
}
