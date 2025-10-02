import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  imagebb_api_key: process.env.IMAGEBB_API_KEY,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  from_email: process.env.FROM_EMAIL,
  from_pass: process.env.FROM_PASS,
  client_url: process.env.CLIENT_URL,
  sslCommerz: {
    store_id: process.env.STORE_ID,
    store_password: process.env.STORE_PASSWORD,
    success_url: process.env.SUCCESS_URL,
    failed_url: process.env.FAIL_URL,
    cancel_url: process.env.CANCEL_URL,
    is_live: process.env.is_live,
    sslPaymentApi: process.env.SSL_PAYMENT_API,
    validation_api: process.env.VALIDATION_API,
  },
};
