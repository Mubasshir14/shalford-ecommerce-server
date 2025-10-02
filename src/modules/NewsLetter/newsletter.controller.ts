import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { NewsletterService } from './newsletter.service';

const createNewsletter: RequestHandler = catchAsync(async (req, res) => {
  const result = await NewsletterService.createNewsletter(req.files, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Newsletter created successfully',
    data: result,
  });
});

const getAllNewsletter: RequestHandler = catchAsync(async (req, res) => {
  const result = await NewsletterService.getAllNewsletter();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Newsletter are retrieved successfully',
    data: result,
  });
});

const getSingleNewsletter: RequestHandler = catchAsync(async (req, res) => {
  const { newsletterId } = req.params;
  const result = await NewsletterService.getSingleNewsletter(newsletterId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Newsletter retrieved successfully',
    data: result,
  });
});

const deleteNewsletter: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NewsletterService.deleteNewsletter(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Newsletter deleted successfully',
    data: result,
  });
});

export const NewsletterController = {
  createNewsletter,
  getAllNewsletter,
  getSingleNewsletter,
  deleteNewsletter,
};
