/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { ProductCategory } from './category.model';
import { TProductCategory } from './catrgory.interface';

const createCategory = async (
  categoryData: Partial<TProductCategory>,
  files: any,
) => {
  if (!files || !files.icon || !files.icon[0]?.path) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Category icon is required.');
  }

  const category = new ProductCategory({
    ...categoryData,
    icon: files.icon[0].path,
  });
  const result = await category.save();
  return result;
};

const getAllCategories = async () => {
  return await ProductCategory.find({});
};

const getCategoryById = async (id: string) => {
  return await ProductCategory.findById(id);
};

const updateCategory = async (
  id: string,
  categoryData: Partial<TProductCategory>,
  files: any,
) => {
  return await ProductCategory.findByIdAndUpdate(
    id,
    { ...categoryData, icon: files.icon[0].path },
    { new: true, runValidators: true },
  );
};

const deleteCategory = async (id: string) => {
  return await ProductCategory.findByIdAndDelete(id);
};

export const ProductCategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
