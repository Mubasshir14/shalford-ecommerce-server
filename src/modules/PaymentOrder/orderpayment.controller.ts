// const getMyOrders = catchAsync(async (req: Request, res: Response) => {
//   const result = await PaymentService.getMyOrders(req.user as IJwtPayload);
//   console.log(req.user);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Order retrive succesfully',
//     data: result,
//   });
// });

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { IJwtPayload } from '../Auth/auth.interface';
import { Request, Response } from 'express';
import { OrderPaymentService } from './paymentorder.service';

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderPaymentService.getMyOrders(req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getOrderDetails = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.params.id);
  const result = await OrderPaymentService.getOrderDetails(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getStatusBasedOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderPaymentService.getStatusBasedOrders(req.params.s);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getTotalPaymentOrder = catchAsync(async (req: Request, res: Response) => {
  console.log('Hi');
  const result = await OrderPaymentService.getTotalPaymentOrder();
  console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getPending = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderPaymentService.getPendingOrders();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getProcessing = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderPaymentService.getProcessingOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getCompletedOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderPaymentService.getCompletedOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});
const getCancelledOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderPaymentService.getCancelledOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const trackOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderPaymentService.trackOrder(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const changeOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  console.log(req.body, req.params.id);
  const result = await OrderPaymentService.changeOrderStatus(
    req.params.id,
    status,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order status changed succesfully',
    data: result,
  });
});

export const OrderPaymentController = {
  getOrderDetails,
  getMyOrders,
  changeOrderStatus,
  getCompletedOrder,
  getStatusBasedOrders,
  getTotalPaymentOrder,
  getProcessing,
  getPending,
  getCancelledOrder,
  trackOrder,
};
