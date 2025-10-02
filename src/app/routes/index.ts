import { Router } from 'express';
import { UserRoutes } from '../../modules/User/user.route';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { ProductcategoryRoute } from '../../modules/ProductCategory/category.route';
import { ProductRoutes } from '../../modules/Product/product.route';
import { ReviewRoutes } from '../../modules/Review/review.route';
import { BannerRoutes } from '../../modules/Banner/banner.route';
import { CartRoutes } from '../../modules/Cart/cart.route';
import { OrderRoutes } from '../../modules/Order/order.routes';
import { SSLRoutes } from '../../modules/sslcommerz/sslcommerz.routes';
import { OrderPaymentRoutes } from '../../modules/PaymentOrder/order.payment.route';
import { NewsletterRoutes } from '../../modules/NewsLetter/newsletter.route';
import { PopupRoutes } from '../../modules/Popup/popup.route';
import { GalleryRoutes } from '../../modules/Gallery/popup.route';
import { SubscriberRoutes } from '../../modules/Subscriber/subscriber.route';

const router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/category', route: ProductcategoryRoute },
  { path: '/product', route: ProductRoutes },
  { path: '/review', route: ReviewRoutes },
  { path: '/banner', route: BannerRoutes },
  { path: '/cart', route: CartRoutes },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/ssl',
    route: SSLRoutes,
  },
  {
    path: '/orderpayment',
    route: OrderPaymentRoutes,
  },
  {
    path: '/newsletter',
    route: NewsletterRoutes,
  },
  {
    path: '/popup',
    route: PopupRoutes,
  },
  {
    path: '/gallery',
    route: GalleryRoutes,
  },
  {
    path: '/subscriber',
    route: SubscriberRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
