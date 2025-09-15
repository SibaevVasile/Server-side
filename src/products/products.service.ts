import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
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

  getProducts() {
    return this.products;
  }
}
