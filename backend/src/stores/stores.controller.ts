import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateStoreDto, StoresService } from './stores.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  // Create a store (Admin only)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  async create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  // Get all stores (Public access)
  @Get()
  async findAll() {
    return this.storesService.findAll();
  }

  // Get a specific store by ID (Public access)
  @Get(':id')
  async findById(@Param('id') storeId: string) {
    return this.storesService.findById(storeId);
  }

  // Delete a store (Admin only)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  async delete(@Param('id') storeId: string) {
    return this.storesService.delete(storeId);
  }
}