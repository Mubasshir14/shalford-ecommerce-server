import { Schema } from 'mongoose';

export type TReview = {
  user: Schema.Types.ObjectId;
  comment: string;
  rating: number;
  product: Schema.Types.ObjectId;
};
