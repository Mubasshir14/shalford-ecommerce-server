import mongoose from 'mongoose';

export interface ICart {
  user?: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  size: string;
  color?: string;
  price: number;
  totalPrice: number;
  quantity: number;
}
