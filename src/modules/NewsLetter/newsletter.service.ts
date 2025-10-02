/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { Newsletter } from './newsletter.model';

const createNewsletter = async (files: any, data: any) => {
  if (!files || !files.image || !files.image[0]?.path) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Newsletter image is required.',
    );
  }

  const { title, link } = data || {};
  const newNewsletter = new Newsletter({
    title: title || '',
    image: files.image[0].path,
    link: link || '',
  });

  const result = await newNewsletter.save();
  return result;
};

const getAllNewsletter = async () => {
  const result = await Newsletter.find().sort({ createdAt: -1 });
  return result;
};

const getSingleNewsletter = async (NewsletterId: string) => {
  const result = await Newsletter.findById(NewsletterId);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Newsletter not found');
  }
  return result;
};

const deleteNewsletter = async (id: string) => {
  const newsletter = await Newsletter.findById({ _id: id });
  if (!newsletter) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Newsletter not found');
  }
  return await Newsletter.findByIdAndDelete({ _id: id });
};

export const NewsletterService = {
  createNewsletter,
  getAllNewsletter,
  getSingleNewsletter,
  deleteNewsletter,
};
