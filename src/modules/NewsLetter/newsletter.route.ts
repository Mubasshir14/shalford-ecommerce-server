import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import auth from '../../app/middlewares/auth';
import { NewsletterController } from './newsletter.controller';

const router = Router();

router.get('/', NewsletterController.getAllNewsletter);

router.get('/:id', NewsletterController.getSingleNewsletter);

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'image' }]),
  parseBody,
  NewsletterController.createNewsletter,
);

router.delete('/:id', auth(UserRole.ADMIN), NewsletterController.deleteNewsletter);

export const NewsletterRoutes = router;
