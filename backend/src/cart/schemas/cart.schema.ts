import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Reference to User

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  products: Types.ObjectId[]; // List of Products in the cart
}

export const CartSchema = SchemaFactory.createForClass(Cart);