import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PizzasService {
  private pizzas = [
    { id: 1, name: 'Pizza Margherita', price: 70 },
    { id: 2, name: 'Pizza Pepperoni', price: 85 },
    { id: 3, name: 'Pizza Quattro Formaggi', price: 95 },
    { id: 4, name: 'Pizza Vegetariana', price: 75 },
    { id: 5, name: 'Pizza Prosciutto', price: 90 },
    { id: 6, name: 'Pizza BBQ Chicken', price: 100 },
    { id: 7, name: 'Pizza Diavola', price: 95 },
    { id: 8, name: 'Pizza Capricciosa', price: 85 },
    { id: 9, name: 'Pizza Tonno', price: 80 },
    { id: 10, name: 'Pizza Hawaii', price: 85 },
  ];

  findAll() {
    return this.pizzas;
  }

  findOne(id: number) {
    const pizza = this.pizzas.find((p) => p.id === id);
    if (!pizza) {
      throw new NotFoundException(`Pizza with id ${id} not found`);
    }
    return pizza;
  }
  create(pizzaData: { name: string; price: number }) {
    const newId = this.pizzas.length > 0 ? this.pizzas[this.pizzas.length - 1].id + 1 : 1;
    const newPizza = { id: newId, ...pizzaData };
    this.pizzas.push(newPizza);
    return newPizza;
  }
  
  search(name?: string, minPrice?: number, maxPrice?: number) {
    let results = this.pizzas;

    if (name) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    if (minPrice) {
      results = results.filter((p) => p.price >= minPrice);
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= maxPrice);
    }

    return results;
  }
}

