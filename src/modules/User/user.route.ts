import { Router } from 'express';
import { UserController } from './user.controller';
import { UserRole } from './user.interface';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { UserValidation } from './user.validation';
import clientInfoParser from '../../app/middlewares/clientInfoParser';

const router = Router();

router.get('/', auth(UserRole.ADMIN), UserController.getAllUser);

router.post(
  '/register',
  clientInfoParser,
  validateRequest(UserValidation.userValidationSchema),
  UserController.registerUser,
);

export const UserRoutes = router;
