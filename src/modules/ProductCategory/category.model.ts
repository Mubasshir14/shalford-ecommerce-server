import { model, Model, Schema } from 'mongoose';
import { TProductCategory } from './catrgory.interface';

const productCategorySchema = new Schema<TProductCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductCategory: Model<TProductCategory> = model<TProductCategory>(
  'ProductCategory',
  productCategorySchema,
);
