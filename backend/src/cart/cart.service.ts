import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // Add product to user's cart
  async addToCart(userId: string, productId: string): Promise<Cart> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new this.cartModel({ user: userId, products: [] });
    }

    cart.products.push(product._id as Types.ObjectId);
    return cart.save();
  }

  // Get user's cart
  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId }).populate('products').exec();
    if (!cart) {
      throw new NotFoundException(`Cart for user ${userId} not found`);
    }
    return cart;
  }

  // Remove product from user's cart
  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException(`Cart for user ${userId} not found`);
    }

    cart.products = cart.products.filter((id) => id.toString() !== productId);
    return cart.save();
  }

  // Checkout user's cart
  async checkout(userId: string): Promise<void> {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException(`Cart for user ${userId} not found`);
    }

    // Payment could be here
    // For simplicity, just clearing the cart!
    cart.products = [];
    await cart.save();
  }
}

