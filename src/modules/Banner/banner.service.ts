/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { Banner } from './banner.model';

const createBanner = async (files: any, data: any) => {
  if (!files || !files.image || !files.image[0]?.path) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Banner image is required.');
  }

  const { title } = data || {};
  const newBanner = new Banner({
    title: title || '',
    image: files.image[0].path,
  });

  const result = await newBanner.save();
  return result;
};

const getAllBanner = async () => {
  const result = await Banner.find();
  return result;
};

const getSingleBanner = async (bannerId: string) => {
  const result = await Banner.findById(bannerId);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Banner not found');
  }
  return result;
};

const deleteBanner = async (id: string) => {
  const banner = await Banner.findById({ _id: id });
  if (!banner) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Banner not found');
  }
  return await Banner.findByIdAndDelete({ _id: id });
};

export const BannerService = {
  createBanner,
  getAllBanner,
  getSingleBanner,
  deleteBanner,
};
