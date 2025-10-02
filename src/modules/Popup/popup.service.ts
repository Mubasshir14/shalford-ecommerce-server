/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { Popup } from './popup.model';

const createPopup = async (files: any, data: any) => {
  if (!files || !files.image || !files.image[0]?.path) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Popup image is required.');
  }

  const { title, link } = data || {};
  const newPopup = new Popup({
    title: title || '',
    image: files.image[0].path,
    link: link || '',
  });

  const result = await newPopup.save();
  return result;
};

const getAllPopup = async () => {
  const result = await Popup.find().sort({ createdAt: -1 });
  return result;
};

const getSinglePopup = async (PopupId: string) => {
  const result = await Popup.findById(PopupId);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Popup not found');
  }
  return result;
};

const deletePopup = async (id: string) => {
  const popup = await Popup.findById({ _id: id });
  if (!popup) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Popup not found');
  }
  return await Popup.findByIdAndDelete({ _id: id });
};

export const PopupService = {
  createPopup,
  getAllPopup,
  getSinglePopup,
  deletePopup,
};
