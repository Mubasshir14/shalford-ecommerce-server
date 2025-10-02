import mongoose, { Types } from 'mongoose';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { sslService } from '../sslcommerz/sslcommerz.service';
import { StatusCodes } from 'http-status-codes';
import { IJwtPayload } from '../Auth/auth.interface';
import Product from '../Product/product.model';
import { generateTransactionId } from '../Payment/payment.utils';
import { Payment } from '../Payment/payment.model';
import AppError from '../../app/errors/AppError';
import User from '../User/user.model';


const createOrder = async (
  orderData: Partial<IOrder>,
  authUser: IJwtPayload,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const order = new Order({
      ...orderData,
      user: authUser.userId,
    });

    const createdOrder = await order.save({ session });
    await createdOrder.populate('user product');

    const transactionId = generateTransactionId();

    const payment = new Payment({
      user: authUser.userId,
      order: createdOrder._id,
      method: orderData.paymentMethod,
      transactionId,
      amount: createdOrder.totalAmount,
      status: 'Pending', 
    });

    await payment.save({ session });

    let result;

    if (createdOrder.paymentMethod == 'Online') {
      result = await sslService.initPayment({
        total_amount: createdOrder.totalAmount,
        tran_id: transactionId,
      });
      result = { paymentUrl: result };
    } else {
      // For COD, decrement stock immediately
      if (orderData.product) {
        for (const productItem of orderData.product) {
          const product = await Product.findById(productItem.product).session(session);

          if (!product) {
            throw new Error(`Product not found: ${productItem.product}`);
          }

          if (product.isActive === false) {
            throw new Error(`Product ${product?.name} is inactive.`);
          }

          if (product.stock < productItem.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
          }

          product.stock -= productItem.quantity;
          await product.save({ session });
        }
      }
      result = order;
    }

    await session.commitTransaction();
    return result;
  } catch (error) {
    console.log(error);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const getOrderDetails = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('user product');
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not Found');
  }

  order.payment = await Payment.findOne({ order: order._id });
  return order;
};

const getMyOrders = async (
  query: Record<string, unknown>,
  authUser: IJwtPayload,
) => {
  const orderQuery = await Order.find({ user: authUser.userId }).populate(
    'user product',
  );

  return orderQuery;
};

const changeOrderStatus = async (
  orderId: string,
  status: string,
  authUser: IJwtPayload,
) => {
  const user = await User.findById(authUser.userId);

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');

  const order = await Order.findOneAndUpdate(
    { _id: new Types.ObjectId(orderId) },
    { status },
    { new: true },
  );
  return order;
};

export const OrderService = {
  createOrder,
  getOrderDetails,
  getMyOrders,
  changeOrderStatus,
};
