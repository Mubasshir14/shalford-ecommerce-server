import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import auth from '../../app/middlewares/auth';
import { ProductController } from './product.controller';

const router = Router();

router.get('/', ProductController.getAllProduct);
router.get('/onsale', ProductController.getOnSaleProduct);
router.get('/featured', ProductController.getFeaturedProduct);
router.get('/not-onsale', ProductController.getNotOnSaleProduct);
router.get('/not-featured', ProductController.getNotFeaturedProduct);
router.get('/category/:id', ProductController.getCategoryWisedProduct);

router.get('/:id', ProductController.getSingleProduct);

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  // validateRequest(ProductValidation.productZodSchema),
  ProductController.createProduct,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  ProductController.updateProduct,
);
router.patch(
  '/onsale/:id',
  auth(UserRole.ADMIN),
  ProductController.OnSaleProductHandle,
);
router.patch(
  '/featured/:id',
  auth(UserRole.ADMIN),
  ProductController.OnFeaturedProductHandle,
);

router.delete('/:id', auth(UserRole.ADMIN), ProductController.deleteProduct);

export const ProductRoutes = router;
