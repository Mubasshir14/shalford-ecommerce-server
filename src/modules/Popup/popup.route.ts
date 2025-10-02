import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import auth from '../../app/middlewares/auth';
import { PopupController } from './popup.controller';

const router = Router();

router.get('/', PopupController.getAllPopup);

router.get('/:id', PopupController.getSinglePopup);

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'image' }]),
  parseBody,
  PopupController.createPopup,
);

router.delete('/:id', auth(UserRole.ADMIN), PopupController.deletePopup);

export const PopupRoutes = router;
