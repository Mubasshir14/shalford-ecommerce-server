import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { SubscriberController } from './subscriber.controller';

const router = Router();

router.get('/', auth(UserRole.ADMIN), SubscriberController.getAllSubscriber);

router.post('/', SubscriberController.createSubscriber);

export const SubscriberRoutes = router;
