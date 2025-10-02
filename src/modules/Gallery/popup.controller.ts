import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { GalleryService } from './popup.service';

const createGallery: RequestHandler = catchAsync(async (req, res) => {
  const result = await GalleryService.createGallery(
    req.files,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Gallery created successfully',
    data: result,
  });
});

const getAllGallery: RequestHandler = catchAsync(async (req, res) => {
  const result = await GalleryService.getAllGallery();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Gallery are retrieved successfully',
    data: result,
  });
});

const getSingleGallery: RequestHandler = catchAsync(async (req, res) => {
  const { GalleryId } = req.params;
  const result = await GalleryService.getSingleGallery(GalleryId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Gallery retrieved successfully',
    data: result,
  });
});

const deleteGallery: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GalleryService.deleteGallery(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Gallery deleted successfully',
    data: result,
  });
});

export const GalleryController = {
  createGallery,
  getAllGallery,
  getSingleGallery,
  deleteGallery,
};
