import { Test, TestingModule } from '@nestjs/testing';
import { AdminPizzasController } from './admin-pizzas.controller';
import { PizzasService } from './pizzas.service';

describe('AdminPizzasController', () => {
  let controller: AdminPizzasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPizzasController],
      providers: [PizzasService],
    }).compile();

    controller = module.get<AdminPizzasController>(AdminPizzasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a pizza', () => {
    const newPizza = { id: 11, name: 'Test Pizza', price: 40 };
    controller.add(newPizza);
    const pizza = controller.findOne('11');
    expect(pizza).toEqual(newPizza);
  });

  it('should delete a pizza', () => {
    controller.delete('1');
    const pizza = controller.findOne('1');
    expect(pizza).toBeUndefined();
  });
});
