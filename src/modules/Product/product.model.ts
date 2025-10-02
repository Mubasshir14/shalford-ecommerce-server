import { model, Model, Schema } from 'mongoose';
import { Color, Gender, IProduct, Size } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    gender: {
      type: String,
      enum: [Gender.MALE, Gender.FEMALE, Gender.UNISEX],
    },
    size: [
      {
        type: String,
        enum: [Size.L, Size.M, Size.S, Size.XL, Size.XS, Size.XXL],
      },
    ],
    color: [
      {
        type: String,
        enum: [
          Color.BLACK,
          Color.BLUE,
          Color.BROWN,
          Color.GREEN,
          Color.GREY,
          Color.ORANGE,
          Color.PINK,
          Color.PURPLE,
          Color.RED,
          Color.WHITE,
          Color.YELLOW,
        ],
      },
    ],
    price: { type: Number, required: true, min: 0 },
    delPrice: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    isFeatured: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Product: Model<IProduct> = model<IProduct>('Product', productSchema);

export default Product;
