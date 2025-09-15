import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders = [
    { id: 1, userId: 1, pizzaId: 2, quantity: 1, status: 'pending' },
    { id: 2, userId: 2, pizzaId: 5, quantity: 2, status: 'delivered' },
    { id: 3, userId: 1, pizzaId: 7, quantity: 1, status: 'in progress' },
  ];

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }
}
