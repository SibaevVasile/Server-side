import { Controller, Get, Param } from '@nestjs/common';
import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PublicPizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(+id);
  }
}
