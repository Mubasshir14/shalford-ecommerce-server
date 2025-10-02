/* eslint-disable @typescript-eslint/no-explicit-any */

import { Subscriber } from './subscriber.model';

const createSubscriber = async (data: any) => {
  const newSubscriber = new Subscriber({
    email: data,
  });

  const result = await newSubscriber.save();
  return result;
};

const getAllSubscriber = async () => {
  const result = await Subscriber.find().sort({ createdAt: -1 });
  return result;
};

export const SubscriberService = {
  createSubscriber,
  getAllSubscriber,
};
