/* eslint-disable @typescript-eslint/no-explicit-any */
import { IJwtPayload } from '../Auth/auth.interface';
import { Payment } from '../Payment/payment.model';
import mongoose from 'mongoose';
import Product from '../Product/product.model';
import User from '../User/user.model';
import { Order } from '../Order/order.model';
import AppError from '../../app/errors/AppError';
import { sendOrderUpdateEmail } from '../../app/utils/sendEmails';

export const getMyOrders = async (authUser: IJwtPayload) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(authUser.userId);

    const orders = await Payment.find({ user: userObjectId })
      .populate('user')
      .populate({
        path: 'order',
        populate: [
          { path: 'product.product', model: Product },
          { path: 'user', model: User },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((payment: any) => ({
      ...payment,
      order: {
        ...payment.order,
        products: payment.order.product.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      },
    }));

    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getStatusBasedOrders = async (s: string) => {
  try {
    if (!s) {
      throw new AppError(500, 'Status is required');
    }
    console.log('Querying orders with status:', s);
    const orders = await Payment.find()
      .populate('user')
      .populate({
        path: 'order',
        match: { status: s },
        populate: [
          { path: 'product.product', model: Product },
          { path: 'user', model: User },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    // const formattedOrders = orders.map((payment: any) => ({
    //   ...payment,
    //   order: {
    //     ...payment.order,
    //     products: payment.order.product.map((item: any) => ({
    //       ...item.product,
    //       quantity: item.quantity,
    //       color: item.color,
    //       size: item.size,
    //     })),
    //   },
    // }));

    const formattedOrders = orders
      .filter((payment: any) => payment.order) // only keep payments with a matching order
      .map((payment: any) => {
        const order = payment.order;
        return {
          ...payment,
          order: {
            ...order,
            products: (order.product || []).map((item: any) => ({
              ...item.product,
              quantity: item.quantity,
              color: item.color,
              size: item.size,
            })),
          },
        };
      });

    // const formattedOrders = orders.map((payment: any) => {
    //   const order = payment.order || { product: [] };
    //   return {
    //     ...payment,
    //     order: {
    //       ...order,
    //       products: (order.product || []).map((item: any) => ({
    //         ...item.product,
    //         quantity: item.quantity,
    //         color: item.color,
    //         size: item.size,
    //       })),
    //     },
    //   };
    // });

    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getTotalPaymentOrder = async () => {
  const result = await Payment.find();
  return result;
};
const getPendingOrders = async () => {
  try {
    const orders = await Payment.find()
      .populate('user')
      .populate({
        path: 'order',
        match: { status: 'Pending' },
        populate: [
          { path: 'product.product', model: Product },
          { path: 'user', model: User },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((payment: any) => ({
      ...payment,
      order: {
        ...payment.order,
        products: payment.order.product.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      },
    }));

    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getProcessingOrders = async () => {
  try {
    const orders = await Payment.find()
      .populate('user')
      .populate({
        path: 'order',
        match: { status: 'Processing' },
        populate: [
          { path: 'product.product', model: Product },
          { path: 'user', model: User },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((payment: any) => ({
      ...payment,
      order: {
        ...payment.order,
        products: payment.order.product.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      },
    }));
    // console.log('FROM ORDER PAYMENT SERVICE');
    // console.log('Order', formattedOrders);

    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getCompletedOrders = async () => {
  try {
    const orders = await Payment.find()
      .populate('user')
      .populate({
        path: 'order',
        match: { status: 'Completed' },
        populate: [
          { path: 'product.product', model: Product },
          { path: 'user', model: User },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((payment: any) => ({
      ...payment,
      order: {
        ...payment.order,
        products: payment.order.product.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      },
    }));

    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
const getCancelledOrders = async () => {
  try {
    const orders = await Payment.find()
      .populate('user')
      .populate({
        path: 'order',
        match: { status: 'Cancelled' },
        populate: [
          { path: 'product.product', model: Product },
          { path: 'user', model: User },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((payment: any) => ({
      ...payment,
      order: {
        ...payment.order,
        products: payment.order.product.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      },
    }));

    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getOrderDetails = async (id: string) => {
  const orderObjectId = new mongoose.Types.ObjectId(id);

  const orders = await Payment.find({ order: orderObjectId })
    .populate('user')
    .populate({
      path: 'order',
      populate: [
        { path: 'product.product', model: Product },
        { path: 'user', model: User },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();

  const formattedOrders = orders.map((payment: any) => ({
    ...payment,
    order: {
      ...payment.order,
      products: payment.order.product.map((item: any) => ({
        ...item.product,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      })),
    },
  }));

  return formattedOrders;
};

const trackOrder = async (id: string) => {
  try {
    if (!id) {
      throw new AppError(400, 'Transaction ID is required');
    }

    console.log('Tracking order with transactionId:', id);

    const payments = await Payment.find({ transactionId: id, status: 'Paid' })
      .populate('user')
      .populate({
        path: 'order',
        populate: [
          { path: 'product.product', model: Product },
          { path: 'user', model: User },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    if (!payments.length) {
      throw new AppError(404, 'Order not found with this transactionId');
    }

    const formattedOrders = payments.map((payment: any) => ({
      ...payment,
      order: {
        ...payment.order,
        products: payment.order.product.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      },
    }));

    return formattedOrders;
  } catch (error) {
    console.error('Error tracking order:', error);
    throw error;
  }
};


const changeOrderStatus = async (id: string, status: string) => {
  try {
    console.log('Updating Order ID:', id, 'to status:', status);

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate('user')
      .lean();

    if (!order) throw new Error('Order not found');

    const payment = await Payment.findOne({ order: id })
      .populate('user')
      .lean();
    if (!payment) throw new Error('Payment not found');

    const { transactionId, amount, user } = payment;
    const { name, email, phone } = user as any;
    await sendOrderUpdateEmail({
      id,
      name,
      email,
      phone,
      transactionId,
      amount,
      status,
    });

    return order;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const OrderPaymentService = {
  getStatusBasedOrders,
  getTotalPaymentOrder,
  getPendingOrders,
  getCompletedOrders,
  getProcessingOrders,
  getCancelledOrders,
  getOrderDetails,
  getMyOrders,
  changeOrderStatus,
  trackOrder,
};
