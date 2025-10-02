import { z } from 'zod';

const createProductCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty('Category name is required')
      .max(100, 'Category name should not exceed 100 characters'),
    description: z.string(),
  }),
});

const updateProductCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .max(100, 'Category name should not exceed 100 characters')
      .optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const ProductCategoryValidation = {
  createProductCategoryValidationSchema,
  updateProductCategoryValidationSchema,
};
