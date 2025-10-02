import { model, Schema } from 'mongoose';
import { TPopup } from './popup.interface';

const PopupSchema = new Schema<TPopup>(
  { title: { type: String }, image: { type: String, required: true }, link: { type: String }, },
  { timestamps: true },
);

export const Popup = model<TPopup>('Popup', PopupSchema);
