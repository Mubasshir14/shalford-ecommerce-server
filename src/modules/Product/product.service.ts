/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { IProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (
  productData: Partial<IProduct>,
  productImages: any,
) => {
  const { images } = productImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Product images are required.');
  }

  productData.images = images.map((image: any) => image.path);

  const newProduct = new Product({ ...productData });

  const result = await newProduct.save();
  return result;
};

const getAllProduct = async () => {
  const result = await Product.find()
    .sort({ createdAt: -1 })
    .populate('category');
  return result;
};

const getOnSaleProduct = async () => {
  const result = await Product.find({ isOnSale: true })
    .sort({ createdAt: -1 })
    .populate('category');
  return result;
};

const getFeaturedProduct = async () => {
  const result = await Product.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .populate('category');
  return result;
};

const getCategoryWisedProduct = async (payload: string) => {
  const result = await Product.find({ category: payload })
    .sort({ createdAt: -1 })
    .populate('category');
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id).populate('category');
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return result;
};

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
  productImages: any,
) => {
  const { images } = productImages;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
  }

  if (images && images.length > 0) {
    payload.images = images.map((image: any) => image.path);
  }

  return await Product.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProduct = async (id: string) => {
  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
  }

  return await Product.findByIdAndDelete(id);
};

export const ProductService = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getCategoryWisedProduct,
  getFeaturedProduct,
  getOnSaleProduct,
};
