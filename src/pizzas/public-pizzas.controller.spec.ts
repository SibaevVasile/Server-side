import { Test, TestingModule } from '@nestjs/testing';
import { PublicPizzasController } from './public-pizzas.controller';
import { PizzasService } from './pizzas.service';

describe('PublicPizzasController', () => {
  let controller: PublicPizzasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicPizzasController],
      providers: [PizzasService],
    }).compile();

    controller = module.get<PublicPizzasController>(PublicPizzasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of pizzas', () => {
    const pizzas = controller.findAll();
    expect(pizzas.length).toBeGreaterThan(0);
  });

  it('should return a pizza by id', () => {
    const pizza = controller.findOne('1');
    expect(pizza).toHaveProperty('id', 1);
  });

  it('should return undefined for non-existing pizza id', () => {
    const pizza = controller.findOne('999');
    expect(pizza).toBeUndefined();
  });
});
