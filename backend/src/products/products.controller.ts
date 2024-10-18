import { Controller, Post, Delete, Param, Body, UseGuards, Get } from '@nestjs/common';
import { CreateProductDto, ProductsService } from './products.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('stores/:storeId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Create a new product in a store (Admin only)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Role-based guard to restrict access
  async create(
    @Param('storeId') storeId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(storeId, createProductDto);
  }

  // Get a product by ID (Public access)
  @Get(':productId')
  async findById(@Param('productId') productId: string) {
    return this.productsService.findById(productId);
  }

  // Delete a product from a store (Admin only)
  @Delete(':productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Role-based guard to restrict access
  async delete(
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
  ) {
    return this.productsService.delete(storeId, productId);
  }
}
