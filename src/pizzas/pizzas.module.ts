import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PublicPizzasController } from './public-pizzas.controller';
import { AdminPizzasController } from './admin-pizzas.controller';

@Module({
  controllers: [PublicPizzasController, AdminPizzasController],
  providers: [PizzasService],
})
export class PizzasModule {}
