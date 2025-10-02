import { model, Schema } from 'mongoose';
import { TSubscriber } from './subscriber.interface';


const SubscriberSchema = new Schema<TSubscriber>(
  { email: { type: String } },
  { timestamps: true },
);

export const Subscriber = model<TSubscriber>('Subscriber', SubscriberSchema);
