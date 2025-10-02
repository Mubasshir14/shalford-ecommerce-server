import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { PopupService } from './popup.service';

const createPopup: RequestHandler = catchAsync(async (req, res) => {
  const result = await PopupService.createPopup(
    req.files,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Popup created successfully',
    data: result,
  });
});

const getAllPopup: RequestHandler = catchAsync(async (req, res) => {
  const result = await PopupService.getAllPopup();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Popup are retrieved successfully',
    data: result,
  });
});

const getSinglePopup: RequestHandler = catchAsync(async (req, res) => {
  const { PopupId } = req.params;
  const result = await PopupService.getSinglePopup(PopupId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Popup retrieved successfully',
    data: result,
  });
});

const deletePopup: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PopupService.deletePopup(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Popup deleted successfully',
    data: result,
  });
});

export const PopupController = {
  createPopup,
  getAllPopup,
  getSinglePopup,
  deletePopup,
};
