import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  ParseIntPipe,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  Query
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { CsvFilePipe } from './pipes/csv-file.pipe';

import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // -------------------------------------------
  // EXPORT CSV
  // -------------------------------------------
  @Get('export')
  async exportCsv(
    @Res() res: Response,
    @Query('category') category?: string,
    @Query('isAvailable') isAvailable?: string
  ) {
    let products = await this.productsService.getProducts();

    if (category) {
      products = products.filter(p => p.category === category);
    }

    if (isAvailable !== undefined) {
      const available = isAvailable === 'true';
      products = products.filter(p => p.isAvailable === available);
    }

    const filePath = await this.productsService.exportToCsv(products);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');

    const stream = fs.createReadStream(filePath);
    return stream.pipe(res);
  }

  // -------------------------------------------
  // GET ALL
  // -------------------------------------------
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  // -------------------------------------------
  // GET BY ID
  // -------------------------------------------
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  // -------------------------------------------
  // CREATE
  // -------------------------------------------
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(dto);
  }

  // -------------------------------------------
  // PUT (full replace)
  // -------------------------------------------
  @Put(':id')
  async updateFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, dto, true);
  }

  // -------------------------------------------
  // PATCH (partial update)
  // -------------------------------------------
  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, dto, false);
  }

  // -------------------------------------------
  // DELETE
  // -------------------------------------------
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.remove(id);
  }

  // -------------------------------------------
  // IMPORT CSV
  // -------------------------------------------
  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
    }),
  )
  async importCsv(@UploadedFile(CsvFilePipe) file: Express.Multer.File) {
    const result = await this.productsService.importFromCsv(file.path);
    fs.unlinkSync(file.path); // ștergem fișierul temporar
    return result;
  }
}
