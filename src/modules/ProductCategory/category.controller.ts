import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { ProductCategoryService } from './category.service';

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductCategoryService.createCategory(
    req.body,
    req.files,
  );

  sendResponse(res, {
    success: true,
    message: 'Category created succesfully',
    statusCode: 201,
    data: result,
  });
});

const getAllCategories: RequestHandler = catchAsync(async (_, res) => {
  const result = await ProductCategoryService.getAllCategories();

  sendResponse(res, {
    success: true,
    message: 'Categories fetched successfully',
    statusCode: 200,
    data: result,
  });
});

const getCategoryById: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductCategoryService.getCategoryById(req.params.id);

  sendResponse(res, {
    success: !!result,
    message: result ? ' Category found' : ' Category not found',
    statusCode: result ? 200 : 404,
    data: result,
  });
});

const updateCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductCategoryService.updateCategory(
    req.params.id,
    req.body,
    req.file,
  );

  sendResponse(res, {
    success: !!result,
    message: result ? 'Category updated successfully' : 'Category not found',
    statusCode: result ? 200 : 404,
    data: result,
  });
});

const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductCategoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    success: !!result,
    message: result ? 'category deleted successfully' : 'category not found',
    statusCode: result ? 200 : 404,
    data: result,
  });
});

export const ProductCategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
