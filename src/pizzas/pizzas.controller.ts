import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
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

  @Get('search')
  search(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.pizzasService.search(
      name,
      minPrice ? +minPrice : undefined,
      maxPrice ? +maxPrice : undefined,
    );
  }
  @Post('add')
  create(@Body() body: { name: string; price: number }) {
    return this.pizzasService.create(body);
  }
}
