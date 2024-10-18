import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { Store, StoreSchema } from '../stores/schemas/store.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]), // To handle store association
  ],
  controllers: [ProductsController],
  providers: [ProductsService, JwtAuthGuard, RolesGuard], // Guards for protected routes
  exports: [ProductsService],
})
export class ProductsModule {}
