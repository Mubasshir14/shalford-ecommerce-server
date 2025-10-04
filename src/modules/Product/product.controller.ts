import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ProductService } from './product.service';

const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.createProduct(req.body, req.files);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProduct();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  });
});

const getOnSaleProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getOnSaleProduct();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  });
});
const getFeaturedProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getFeaturedProduct();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  });
});

const getNotOnSaleProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getNotOnSaleProduct();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  });
});
const getNotFeaturedProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getNotFeaturedProduct();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  });
});

const getCategoryWisedProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getCategoryWisedProduct(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  });
});

const getSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const {
    body: payload,
    params: { id },
  } = req;

  const result = await ProductService.updateProduct(id, payload, req.files);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const OnSaleProductHandle: RequestHandler = catchAsync(async (req, res) => {
  const {
    body: { onsale },
    params: { id },
  } = req;
  const result = await ProductService.OnSlaeProductHandle(id, onsale);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product is updated successfully',
    data: result,
  });
});

const OnFeaturedProductHandle: RequestHandler = catchAsync(async (req, res) => {
  const {
    body: { featured },
    params: { id },
  } = req;

  const result = await ProductService.OnFeaturedProductHandle(id, featured);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product is updated successfully',
    data: result,
  });
});

const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const {
    params: { ProductId },
  } = req;

  const result = await ProductService.deleteProduct(ProductId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  OnSaleProductHandle,
  OnFeaturedProductHandle,
  deleteProduct,
  getCategoryWisedProduct,
  getFeaturedProduct,
  getOnSaleProduct,
  getNotOnSaleProduct,
  getNotFeaturedProduct,
};
