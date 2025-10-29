import { Controller, Get, Put, Delete , Param, Query, NotFoundException, UsePipes } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { UppercasePipe } from '../pipes/uppercase.pipe';

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

  // 🔹 Nou endpoint pentru căutare după nume
  @Get('search/by-name')
  @UsePipes(UppercasePipe)
  searchByName(@Query('name') name: string) {
    const result = this.pizzasService.findByName(name);
    if (!result) {
      throw new NotFoundException(`Pizza cu numele ${name} nu există`);
    }
    return result;
  }
}
