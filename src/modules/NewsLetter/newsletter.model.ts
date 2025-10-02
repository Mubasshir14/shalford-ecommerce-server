import { model, Schema } from 'mongoose';
import { TNewsletter } from './newsletter.interface';

const NewsletterSchema = new Schema<TNewsletter>(
  { title: { type: String }, image: { type: String, required: true }, link: { type: String } },
  { timestamps: true },
);

export const Newsletter = model<TNewsletter>('Newsletter', NewsletterSchema);
