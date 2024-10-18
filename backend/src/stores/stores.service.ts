import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store, StoreDocument } from './schemas/store.schema';

export class CreateStoreDto {
    name: string;
    type?: string; 
  }

  @Injectable()
  export class StoresService {
    constructor(@InjectModel(Store.name) private storeModel: Model<StoreDocument>) {}
  
    // Create a new store (Admin only)
    async create(createStoreDto: CreateStoreDto): Promise<Store> {
      const createdStore = new this.storeModel(createStoreDto);
      return createdStore.save();
    }
  
    // Get all stores (all users)
    async findAll(): Promise<Store[]> {
      return this.storeModel.find().exec();
    }
  
    // Get a single store by ID, including products (all users)
    async findById(storeId: string): Promise<Store> {
      const store = await this.storeModel.findById(storeId).populate('products').exec();
      if (!store) {
        throw new NotFoundException(`Store with ID ${storeId} not found`);
      }
      return store;
    }
  
    // Delete a store (Admin only)
    async delete(storeId: string): Promise<Store> {
      const store = await this.storeModel.findByIdAndDelete(storeId).exec();
      if (!store) {
        throw new NotFoundException(`Store with ID ${storeId} not found`);
      }
      return store;
    }
  }
