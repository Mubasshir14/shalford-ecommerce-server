import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import auth from '../../app/middlewares/auth';
import { GalleryController } from './popup.controller';

const router = Router();

router.get('/', GalleryController.getAllGallery);

router.get('/:id', GalleryController.getSingleGallery);

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'image' }]),
  parseBody,
  GalleryController.createGallery,
);

router.delete('/:id', auth(UserRole.ADMIN), GalleryController.deleteGallery);

export const GalleryRoutes = router;
