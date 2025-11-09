import { Injectable, NotFoundException } from '@nestjs/common';
import type{ CreateProductDto } from './dto/create-product.dto';
import type{ UpdateProductDto } from './dto/update-product.dto';
import type{ Product } from './interfaces/product.interface';
import * as fs from 'fs';
import * as csv from 'fast-csv';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Pizza Margherita', description: '', price: 70, category: 'pizza', isAvailable: true },
    { id: 2, name: 'Pizza Pepperoni', description: '', price: 85, category: 'pizza', isAvailable: true },
    { id: 3, name: 'Pizza Quattro Formaggi', description: '', price: 95, category: 'pizza', isAvailable: true },
    { id: 4, name: 'Pizza Vegetariana', description: '', price: 75, category: 'pizza', isAvailable: false },
    { id: 5, name: 'Pizza Prosciutto', description: '', price: 90, category: 'pizza', isAvailable: true },
    { id: 6, name: 'Pizza BBQ Chicken', description: '', price: 100, category: 'pizza', isAvailable: true },
    { id: 7, name: 'Pizza Diavola', description: '', price: 95, category: 'pizza', isAvailable: false },
    { id: 8, name: 'Pizza Capricciosa', description: '', price: 85, category: 'pizza', isAvailable: true },
    { id: 9, name: 'Pizza Tonno', description: '', price: 80, category: 'pizza', isAvailable: true },
    { id: 10, name: 'Pizza Hawaii', description: '', price: 85, category: 'pasta', isAvailable: true },
  ];

  private nextId = 11;

  // ----------------- LISTARE -----------------
  getProducts(): Product[] {
    return this.products;
  }

  // ----------------- FIND ONE -----------------
  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Produsul cu id ${id} nu există`);
    return product;
  }

  // ----------------- CREATE -----------------
  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.nextId++,
      name: createProductDto.name,
      description: createProductDto.description || '',
      price: createProductDto.price,
      category: createProductDto.category,
      isAvailable: createProductDto.isAvailable ?? true,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // ----------------- UPDATE -----------------
  update(id: number, updateProductDto: UpdateProductDto, fullReplace = false): Product {
    const product = this.findOne(id);

    if (fullReplace) {
      // PUT = înlocuire completă
      Object.assign(product, updateProductDto);
    } else {
      // PATCH = actualizare parțială
      for (const key in updateProductDto) {
        if (updateProductDto[key] !== undefined) {
          (product as any)[key] = updateProductDto[key];
        }
      }
    }

    return product;
  }

  // ----------------- DELETE -----------------
  remove(id: number) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produsul cu id ${id} nu există`);

    const removed = this.products.splice(index, 1);
    return { message: 'Produs șters cu succes', removed };
  }

  // ----------------- IMPORT CSV -----------------
  async importFromCsv(filePath: string) {
    return new Promise((resolve, reject) => {
      const results: Product[] = [];
      const errors: any[] = [];
      let rowIndex = 0;

      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', (row) => {
          rowIndex++;
          try {
            if (!row.name || !row.price || !row.category) {
              throw new Error('Câmpuri lipsă');
            }

            const newProduct: Product = {
              id: this.nextId++,
              name: row.name,
              description: row.description || '',
              price: parseFloat(row.price),
              category: row.category,
              isAvailable: row.isAvailable === 'true',
            };

            this.products.push(newProduct);
            results.push(newProduct);
          } catch (err: any) {
            errors.push({
              row: rowIndex,
              data: row,
              errors: [err.message],
            });
          }
        })
        .on('end', () => {
          resolve({
            totalRows: rowIndex,
            successful: results.length,
            failed: errors.length,
            imported: results,
            errors,
          });
        })
        .on('error', (err) => reject(err));
    });
  }

  // ----------------- EXPORT CSV -----------------
  async exportToCsv(products?: Product[]): Promise<string> {
    const data = products || this.products;

    const header = ['id', 'name', 'description', 'price', 'category', 'isAvailable'];
    const rows = data.map(p => [p.id, p.name, p.description, p.price, p.category, p.isAvailable]);
    const csvContent = [header, ...rows].map(r => r.join(',')).join('\n');

    const dir = './exports';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const filePath = `${dir}/products_export.csv`;
    fs.writeFileSync(filePath, csvContent);

    return filePath;
  }
}
