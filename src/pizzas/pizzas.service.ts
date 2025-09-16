import { Injectable, NotFoundException } from '@nestjs/common';

export interface Pizza {
  id: number;
  name: string;
  price: number;
}

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
  
  add(pizza: Omit<Pizza, 'id'>) {
    const newPizza: Pizza = {
      id: this.pizzas.length + 1,
      ...pizza,
    };
    this.pizzas.push(newPizza);
    return newPizza;
  }

  update(id: number, pizzaData: Partial<Pizza>) {
    const pizzaIndex = this.pizzas.findIndex(p => p.id === id);
    if (pizzaIndex === -1) throw new NotFoundException(`Pizza cu id=${id} nu există`);
    this.pizzas[pizzaIndex] = { ...this.pizzas[pizzaIndex], ...pizzaData };
    return this.pizzas[pizzaIndex];
  }

  delete(id: number) {
    const index = this.pizzas.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException(`Pizza cu id=${id} nu există`);
    return this.pizzas.splice(index, 1)[0];
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

