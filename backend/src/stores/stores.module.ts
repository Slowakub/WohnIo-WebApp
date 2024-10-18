import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store, StoreSchema } from './schemas/store.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // To handle product references
  ],
  controllers: [StoresController],
  providers: [StoresService, JwtAuthGuard, RolesGuard], // Include guards for role-based access control
  exports: [StoresService],
})
export class StoresModule {}
