import express from 'express';
import auth from '../../app/middlewares/auth';
import { ReviewController } from './review.controller';
import { UserRole } from '../User/user.interface';
const router = express.Router();

router.post('/', auth(UserRole.USER), ReviewController.createReview);
router.get('/', ReviewController.getReview);
router.get('/product/:id', ReviewController.getProductReview);
router.get('/:id', ReviewController.getProductReview);
router.delete('/:id', auth(UserRole.ADMIN), ReviewController.deleteReviewFromDB);

export const ReviewRoutes = router;
