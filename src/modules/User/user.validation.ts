import { z } from 'zod';
import { UserRole } from './user.interface';

const allowedDomains = ['gmail.com', 'yahoo.com'];
const blockedDomains = [
  'spam.com',
  'temp.com',
  'tempmail.com',
  '10minutemail.com',
];

const emailSchema = z
  .string()
  .email('Invalid email format')
  .refine(
    (email) => {
      const domain = email.split('@')[1];
      return allowedDomains.includes(domain.toLowerCase());
    },
    { message: 'Only Gmail or Yahoo emails are allowed' },
  )
  .refine(
    (email) => {
      const domain = email.split('@')[1];
      return !blockedDomains.includes(domain.toLowerCase());
    },
    { message: 'Disposable or blocked email domains are not allowed' },
  );

const phoneSchema = z
  .string()
  .regex(
    /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
    'Invalid Bangladeshi phone number',
  );

const clientInfoSchema = z.object({
  device: z.enum(['pc', 'mobile']).optional().default('pc'),
  browser: z.string().min(1, 'Browser name is required'),
  ipAddress: z.string().min(1, 'IP address is required'),
  pcName: z.string().optional(),
  os: z.string().optional(),
  userAgent: z.string().min(1, 'User agent is required'),
});

const userValidationSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().min(1, 'Name is required'),
    role: z
      .enum([UserRole.USER, UserRole.SUPERADMIN, UserRole.ADMIN])
      .default(UserRole.USER),
    phone: phoneSchema,
    clientInfo: clientInfoSchema,
  }),
});

export const UserValidation = {
  userValidationSchema,
};
