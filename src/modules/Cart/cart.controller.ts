import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { IJwtPayload } from '../Auth/auth.interface';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { CartService } from './cartService';

const createCart: RequestHandler = catchAsync(async (req, res) => {
  const result = await CartService.createCart(
    req.body,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart created successfully',
    data: result,
  });
});

const getUserCart: RequestHandler = catchAsync(async (req, res) => {
  const result = await CartService.getUserCart(req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Carts are retrieved successfully',
    data: result,
  });
});

const updateCart: RequestHandler = catchAsync(async (req, res) => {
  const {
    body: payload,
    params: { id },
  } = req;

  const result = await CartService.updateCart(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart updated successfully',
    data: result,
  });
});

const deleteCart: RequestHandler = catchAsync(async (req, res) => {
  const {
    params: { id },
  } = req;

  const result = await CartService.deleteCart(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart deleted successfully',
    data: result,
  });
});

const deleteUserCart: RequestHandler = catchAsync(async (req, res) => {
  const result = await CartService.deleteUserCart(req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart deleted successfully',
    data: result,
  });
});

export const CartController = {
  createCart,
  getUserCart,
  updateCart,
  deleteCart,
  deleteUserCart,
};
