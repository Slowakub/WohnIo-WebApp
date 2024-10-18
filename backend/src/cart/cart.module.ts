import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // To handle references to products
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // To handle references to users
  ],
  controllers: [CartController],
  providers: [CartService, JwtAuthGuard], // Only JwtAuthGuard is needed to restrict cart access to authenticated users
  exports: [CartService],
})
export class CartModule {}
