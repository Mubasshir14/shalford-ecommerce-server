import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BannerService } from './banner.service';

const createBanner: RequestHandler = catchAsync(async (req, res) => {
  const result = await BannerService.createBanner(req.files, req.body.data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner created successfully',
    data: result,
  });
});

const getAllBanner: RequestHandler = catchAsync(async (req, res) => {
  const result = await BannerService.getAllBanner();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner are retrieved successfully',
    data: result,
  });
});

const getSingleBanner: RequestHandler = catchAsync(async (req, res) => {
  const { BannerId } = req.params;
  const result = await BannerService.getSingleBanner(BannerId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner retrieved successfully',
    data: result,
  });
});

const deleteBanner: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.deleteBanner(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner deleted successfully',
    data: result,
  });
});

export const BannerController = {
  createBanner,
  getAllBanner,
  getSingleBanner,
  deleteBanner,
};
