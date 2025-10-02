import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { UserRole } from '../User/user.interface';
import { Router } from 'express';
import { ProductCategoryController } from './category.controller';
import { ProductCategoryValidation } from './category.validation';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';

const router = Router();

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'icon' }]),
  parseBody,
  validateRequest(
    ProductCategoryValidation.createProductCategoryValidationSchema,
  ),
  ProductCategoryController.createCategory,
);

router.get('/', ProductCategoryController.getAllCategories);
router.get('/:id', ProductCategoryController.getCategoryById);

router.put(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(
    ProductCategoryValidation.updateProductCategoryValidationSchema,
  ),
  ProductCategoryController.updateCategory,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN),
  ProductCategoryController.deleteCategory,
);

export const ProductcategoryRoute = router;
