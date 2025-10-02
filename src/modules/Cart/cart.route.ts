import express from 'express';
import auth from '../../app/middlewares/auth';
import { UserRole } from '../User/user.interface';
import { CartController } from './cart.controller';
const router = express.Router();

router.post('/', auth(UserRole.USER), CartController.createCart);
router.get('/',  auth(UserRole.USER), CartController.getUserCart);
router.patch('/:id', auth(UserRole.USER), CartController.updateCart);
router.delete('/:id', auth(UserRole.USER), CartController.deleteCart);
router.delete('/', auth(UserRole.USER), CartController.deleteUserCart);

export const CartRoutes = router;
