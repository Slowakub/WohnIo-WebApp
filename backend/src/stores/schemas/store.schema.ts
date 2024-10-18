import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  type: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  products: Types.ObjectId[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
