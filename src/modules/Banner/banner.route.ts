import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import auth from '../../app/middlewares/auth';
import { BannerController } from './banner.controller';

const router = Router();

router.get('/', BannerController.getAllBanner);

router.get('/:id', BannerController.getSingleBanner);

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'image' }]),
  parseBody,
  BannerController.createBanner,
);

router.delete('/:id', auth(UserRole.ADMIN), BannerController.deleteBanner);

export const BannerRoutes = router;
