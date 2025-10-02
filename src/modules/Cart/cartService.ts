import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { ICart } from './cart.interface';
import Cart from './cart.model';
import { IJwtPayload } from '../Auth/auth.interface';
import User from '../User/user.model';

const createCart = async (cartData: Partial<ICart>, authUser: IJwtPayload) => {
  const user = await User.findById({ _id: authUser.userId });
  if (!user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'User not found. Please Login.',
    );
  }
  const newCart = new Cart({
    ...cartData,
    user: authUser.userId,
  });
  const result = await newCart.save();
  return result;
};

const getUserCart = async (authUser: IJwtPayload) => {
  return await Cart.find({ user: authUser.userId }).populate('user product');
};

const updateCart = async (id: string, payload: Partial<ICart>) => {
  return await Cart.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCart = async (id: string) => {
  const cart = await Cart.findOne({ _id: id });

  if (!cart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart Not Found');
  }

  return await Cart.findByIdAndDelete(id);
};

const deleteUserCart = async (authUser: IJwtPayload) => {
  const cart = await Cart.findOne({ user: authUser.userId });

  if (!cart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart Not Found');
  }

  return await Cart.findByIdAndDelete({ user: authUser.userId });
};

export const CartService = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  deleteUserCart,
};
