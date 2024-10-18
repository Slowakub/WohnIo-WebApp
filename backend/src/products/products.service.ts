import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Store, StoreDocument } from 'src/stores/schemas/store.schema';


export class CreateProductDto {
    name: string;
    description?: string;
    price: number;
  }
  @Injectable()
  export class ProductsService {
    constructor(
      @InjectModel(Product.name) private productModel: Model<ProductDocument>,
      @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    ) {}
  
    // Create a new product in a store (Admin only)
    async create(storeId: string, createProductDto: CreateProductDto): Promise<Product> {
        // Find the store by its ID
        const store = await this.storeModel.findById(storeId);
        if (!store) {
          throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
      
        // Create a new product instance and save it
        const createdProduct = new this.productModel(createProductDto);
        const product = await createdProduct.save();
      
        // Push the product _id to the store's products array and save the store
        store.products.push(product._id as Types.ObjectId);
        await store.save();
      
        return product;
      }
  
    // Get a product by ID (Accessible by all users)
    async findById(productId: string): Promise<Product> {
      const product = await this.productModel.findById(productId).exec();
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      return product;
    }
  
    // Delete a product from a store (Admin only)
    async delete(storeId: string, productId: string): Promise<Product> {
      const store = await this.storeModel.findById(storeId);
      if (!store) {
        throw new NotFoundException(`Store with ID ${storeId} not found`);
      }
  
      const product = await this.productModel.findByIdAndDelete(productId).exec();
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
  
      store.products = store.products.filter((id) => id.toString() !== productId);
      await store.save();
  
      return product;
    }
  }
