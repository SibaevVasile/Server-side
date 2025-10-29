import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Pizza Margherita', price: 70, category: 'pizza', isAvailable: true },
    { id: 2, name: 'Pizza Pepperoni', price: 85, category: 'pizza', isAvailable: true },
    { id: 3, name: 'Pizza Quattro Formaggi', price: 95, category: 'pizza', isAvailable: true },
    { id: 4, name: 'Pizza Vegetariana', price: 75, category: 'pizza', isAvailable: true },
    { id: 5, name: 'Pizza Prosciutto', price: 90, category: 'pizza', isAvailable: true },
    { id: 6, name: 'Pizza BBQ Chicken', price: 100, category: 'pizza', isAvailable: true },
    { id: 7, name: 'Pizza Diavola', price: 95, category: 'pizza', isAvailable: true },
    { id: 8, name: 'Pizza Capricciosa', price: 85, category: 'pizza', isAvailable: true },
    { id: 9, name: 'Pizza Tonno', price: 80, category: 'pizza', isAvailable: true },
    { id: 10, name: 'Pizza Hawaii', price: 85, category: 'pizza', isAvailable: true },
  ];

  private nextId = 11;

  // ----------------- LISTARE -----------------
  getProducts() {
    return this.products;
  }

  // ----------------- FIND ONE -----------------
  findOne(id: number) {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new NotFoundException(`Produsul cu id ${id} nu există`);
    return product;
  }

  // ----------------- CREATE -----------------
  create(createProductDto: CreateProductDto) {
      const newProduct = {
    id: this.nextId++,
    name: createProductDto.name,
    description: createProductDto.description || '',
    price: createProductDto.price,
    category: createProductDto.category,
    isAvailable: createProductDto.isAvailable ?? true, // default true
  };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto, fullReplace = false) {
  const product = this.findOne(id);

  if (fullReplace) {
    // PUT = înlocuire completă
    Object.assign(product, updateProductDto);
  } else {
    // PATCH = actualizare parțială
    for (const key in updateProductDto) {
      if (updateProductDto[key] !== undefined) {
        product[key] = updateProductDto[key];
      }
    }
  }
  return product;
}

remove(id: number) {
  const index = this.products.findIndex(p => p.id === id);
  if (index === -1) throw new NotFoundException(`Produsul cu id ${id} nu există`);
  
  const removed = this.products.splice(index, 1);
  return { message: 'Produs șters cu succes', removed };
}


}
