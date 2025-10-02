import { model, Schema } from 'mongoose';
import { TGallery } from './popup.interface';

const GallerySchema = new Schema<TGallery>(
  { title: { type: String }, image: { type: String, required: true }, link: { type: String } },
  { timestamps: true },
);

export const Gallery = model<TGallery>('Gallery', GallerySchema);
