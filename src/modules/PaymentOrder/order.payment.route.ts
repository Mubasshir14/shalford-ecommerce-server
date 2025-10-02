import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { OrderPaymentController } from './orderpayment.controller';

const router = Router();

// payment with order api
router.get(
  '/payment/my-order',
  auth(UserRole.USER),
  OrderPaymentController.getMyOrders,
);

router.get(
  '/payment/pending',
  auth(UserRole.ADMIN),
  OrderPaymentController.getPending,
);

router.get(
  '/payment/:id',
  auth(UserRole.ADMIN, UserRole.USER),
  OrderPaymentController.getOrderDetails,
);

router.post(
  '/payment/get/:s',
  auth(UserRole.ADMIN),
  OrderPaymentController.getStatusBasedOrders,
);

router.get(
  '/payment',
  auth(UserRole.ADMIN),
  OrderPaymentController.getTotalPaymentOrder,
);

router.get(
  '/payment/processing',
  auth(UserRole.ADMIN),
  OrderPaymentController.getProcessing,
);

router.get(
  '/payment/completed',
  auth(UserRole.ADMIN, UserRole.USER),
  OrderPaymentController.getCompletedOrder,
);
router.get(
  '/payment/cancelled',
  auth(UserRole.ADMIN, UserRole.USER),
  OrderPaymentController.getCancelledOrder,
);

router.get(
  '/payment/track/:id',
  auth(UserRole.USER, UserRole.ADMIN),
  OrderPaymentController.trackOrder,
);
router.patch(
  '/payment/update-status/:id',
  auth(UserRole.ADMIN),
  OrderPaymentController.changeOrderStatus,
);

export const OrderPaymentRoutes = router;
