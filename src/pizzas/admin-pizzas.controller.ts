import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { PizzasService, Pizza } from './pizzas.service';

@Controller('admin/pizzas')
export class AdminPizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(+id);
  }

  @Post()
  add(@Body() pizza: Omit<Pizza, 'id'>) {
    return this.pizzasService.add(pizza);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pizzaData: Partial<Pizza>) {
    return this.pizzasService.update(+id, pizzaData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pizzasService.delete(+id);
  }
}
