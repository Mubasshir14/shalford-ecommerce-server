import { z } from 'zod';
import { Color, Gender, Size } from './product.interface';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const productZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Product name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    images: z
      .array(z.string().min(1, { message: 'Image URL is required' }))
      .min(1, { message: 'At least one image is required' }),
    reviews: z
      .array(z.string().regex(objectIdRegex, { message: 'Invalid review ID' }))
      .optional(),
    category: z
      .string()
      .regex(objectIdRegex, { message: 'Invalid category ID' }),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.UNISEX]),
    size: z
      .array(z.enum([Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL]))
      .min(1, { message: 'At least one size is required' }),
    color: z
      .array(
        z.enum([
          Color.BLACK,
          Color.BLUE,
          Color.BROWN,
          Color.GREEN,
          Color.GREY,
          Color.ORANGE,
          Color.PINK,
          Color.PURPLE,
          Color.RED,
          Color.WHITE,
          Color.YELLOW,
        ]),
      )
      .optional(),
    price: z.number().min(0, { message: 'Price must be at least 0' }),
    delPrice: z
      .number()
      .min(0, { message: 'Delivery price must be at least 0' }),
    stock: z.number().min(0, { message: 'Stock must be at least 0' }),
    isFeatured: z.boolean().optional(),
    isOnSale: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  productZodSchema,
};
