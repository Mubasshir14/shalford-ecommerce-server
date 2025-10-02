import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { SubscriberService } from './subscriber.service';


const createSubscriber: RequestHandler = catchAsync(async (req, res) => {
  const result = await SubscriberService.createSubscriber(req.body.data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscriber created successfully',
    data: result,
  });
});

const getAllSubscriber: RequestHandler = catchAsync(async (req, res) => {
  const result = await SubscriberService.getAllSubscriber();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscriber are retrieved successfully',
    data: result,
  });
});


export const SubscriberController = {
  createSubscriber,
  getAllSubscriber,
};
