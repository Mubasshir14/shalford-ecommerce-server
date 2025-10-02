import { model, Schema } from 'mongoose';
import { TBanner } from './banner.interface';

const BannerSchema = new Schema<TBanner>(
  { title: { type: String }, image: { type: String, required: true } },
  { timestamps: true },
);

export const Banner = model<TBanner>('Banner', BannerSchema);
