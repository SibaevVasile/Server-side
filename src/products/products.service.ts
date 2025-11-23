import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import * as fs from 'fs';
import * as csv from 'fast-csv';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // ---------------------------------------------------
  // GET ALL
  // ---------------------------------------------------
  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // ---------------------------------------------------
  // FIND ONE
  // ---------------------------------------------------
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Produsul cu ID ${id} nu există`);
    return product;
  }

  // ---------------------------------------------------
  // CREATE
  // ---------------------------------------------------
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  // ---------------------------------------------------
  // UPDATE (PUT sau PATCH)
  // ---------------------------------------------------
  async update(id: number, updateDto: UpdateProductDto, fullReplace = false): Promise<Product> {
    const product = await this.findOne(id);

    if (fullReplace) {
      // FULL REPLACE = PUT
      const updated = this.productRepository.merge(product, updateDto);
      return await this.productRepository.save(updated);
    } else {
      // PARTIAL UPDATE = PATCH
      Object.assign(product, updateDto);
      return await this.productRepository.save(product);
    }
  }

  // ---------------------------------------------------
  // DELETE
  // ---------------------------------------------------
  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);

    return { message: 'Produs șters cu succes', removed: product };
  }

  // ---------------------------------------------------
  // IMPORT CSV → salvează în DB
  // ---------------------------------------------------
  async importFromCsv(filePath: string) {
    return new Promise(async (resolve, reject) => {
      const results: Product[] = [];
      const errors: any[] = [];
      let rowIndex = 0;

      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', async (row) => {
          rowIndex++;
          try {
            if (!row.name || !row.price || !row.category) {
              throw new Error('Câmpuri lipsă');
            }

            const newProduct = this.productRepository.create({
              name: row.name,
              description: row.description || '',
              price: parseFloat(row.price),
              category: row.category,
              isAvailable: row.isAvailable === 'true',
            });

            const saved = await this.productRepository.save(newProduct);
            results.push(saved);

          } catch (err: any) {
            errors.push({
              row: rowIndex,
              data: row,
              errors: [err.message],
            });
          }
        })
        .on('end', async () => {
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

  // ---------------------------------------------------
  // EXPORT CSV → extrage datele din DB
  // ---------------------------------------------------
  async exportToCsv(products?: Product[]): Promise<string> {
    const data = products || await this.productRepository.find();

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
