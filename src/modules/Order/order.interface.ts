import { Types, Document } from 'mongoose';
import { IPayment } from '../Payment/payment.interface';

export interface IOrderProduct {
  [x: string]: any;
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  color: string;
  size: string;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  product: IOrderProduct[];
  coupon: Types.ObjectId | null;
  totalAmount: number;
  deliveryCharge: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  contact?: string;
  district: string;
  upzilla: string;
  shippingAddress: string;
  specification?: string;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  createdAt?: Date;
  updatedAt?: Date;
  payment?: IPayment | null;
}
