/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { Gallery } from './popup.model';

const createGallery = async (files: any, data: any) => {
  if (!files || !files.image || !files.image[0]?.path) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Gallery image is required.');
  }

  const { title, link } = data || {};
  const newGallery = new Gallery({
    title: title || '',
    image: files.image[0].path,
    link: link || '',
  });

  const result = await newGallery.save();
  return result;
};

const getAllGallery = async () => {
  const result = await Gallery.find().sort({ createdAt: -1 });
  return result;
};

const getSingleGallery = async (GalleryId: string) => {
  const result = await Gallery.findById(GalleryId);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Gallery not found');
  }
  return result;
};

const deleteGallery = async (id: string) => {
  const gallery = await Gallery.findById({ _id: id });
  if (!gallery) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Gallery not found');
  }
  return await Gallery.findByIdAndDelete({ _id: id });
};

export const GalleryService = {
  createGallery,
  getAllGallery,
  getSingleGallery,
  deleteGallery,
};
