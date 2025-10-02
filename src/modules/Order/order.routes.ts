import { Router } from 'express';
import { OrderController } from './order.controller';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';

const router = Router();

router.post('/', auth(UserRole.USER), OrderController.createOrder);



export const OrderRoutes = router;
