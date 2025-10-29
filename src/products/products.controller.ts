import { Controller,  Get, Put, Delete, Post, Body, ParseIntPipe, Patch, Param, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // ----------------- LISTARE -----------------
  @Get()
  findAll() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (!product) throw new NotFoundException(`Produsul cu id ${id} nu există`);
    return product;
  }

  // ----------------- CREATE -----------------
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  
// ----------------- PUT = REPLACE COMPLET -----------------
  @Put(':id')
  updateFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto, true); // fullReplace = true
  }

  // ----------------- PATCH = UPDATE PARȚIAL -----------------
  @Patch(':id')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto, false); // fullReplace = false
  }

  // ----------------- DELETE -----------------
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
