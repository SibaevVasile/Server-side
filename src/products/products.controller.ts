import { Controller, Get, Put, Delete, Post, Body, ParseIntPipe, Patch, Param, NotFoundException, UploadedFile, UseInterceptors,StreamableFile,Query,Res} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvFilePipe } from './pipes/csv-file.pipe';
import type { Product } from './interfaces/product.interface';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import type { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ----------------- EXPORT CSV -----------------
@Get('export')
async exportCsv(
  @Res() res: Response,
  @Query('category') category?: string,
  @Query('isAvailable') isAvailable?: string
) {
  let products = this.productsService.getProducts();

  if (category) products = products.filter(p => p.category === category);
  if (isAvailable !== undefined) {
    const available = isAvailable === 'true';
    products = products.filter(p => p.isAvailable === available);
  }

  const filePath = await this.productsService.exportToCsv(products);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
  
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}


  // ----------------- LISTARE -----------------
  @Get()
  findAll(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.productsService.findOne(id);
  }

  // ----------------- CREATE -----------------
  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  // ----------------- PUT -----------------
  @Put(':id')
  updateFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, updateProductDto, true);
  }

  // ----------------- PATCH -----------------
  @Patch(':id')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, updateProductDto, false);
  }

  // ----------------- DELETE -----------------
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // ----------------- IMPORT CSV -----------------
  @Post('import')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // folder temporar
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      },
    }),
  }))
  async importCsv(@UploadedFile(CsvFilePipe) file: Express.Multer.File) {
    const result = await this.productsService.importFromCsv(file.path);
    fs.unlinkSync(file.path); // ștergem fișierul temporar
    return result;
  }

}
