import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getReviewIntoDB = async () => {
  const result = await Review.find();
  return result;
};

const getProductReviewIntoDB = async (id: string) => {
  const result = await Review.find({ product: id }).populate('user product');
  return result;
};

const getSingleProductReviewFromDB = async (id: string) => {
  try {
    const reviews = await Review.find({ meal: id });
    if (reviews.length === 0) {
      return { message: 'No reviews found for this meal.' };
    }
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { message: 'An error occurred while fetching reviews.' };
  }
};

const deleteReviewFromDB = async (id: string) => {
  const result = await Review.deleteOne({ _id: id });
  return result;
};
export const ReviewService = {
  createReviewIntoDB,
  getReviewIntoDB,
  getSingleProductReviewFromDB,
  getProductReviewIntoDB,
  deleteReviewFromDB
};
