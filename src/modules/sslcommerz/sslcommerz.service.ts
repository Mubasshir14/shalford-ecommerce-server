// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import express, { Request, Response } from 'express';
// import SSLCommerzPayment from 'sslcommerz-lts';
// import { StatusCodes } from 'http-status-codes';
// import mongoose from 'mongoose';
// import config from '../../app/config';
// import AppError from '../../app/errors/AppError';
// import { EmailHelper } from '../../app/utils/emailHelper';
// import { generateOrderInvoicePDF } from '../../app/utils/generateOrderInvoicePDF';
// import { Payment } from '../Payment/payment.model';
// import { Order } from '../Order/order.model';

// const app = express();

// const store_id = config.sslCommerz.store_id as string;
// const store_passwd = config.sslCommerz.store_password as string;
// const is_live = false;

// // SSLCommerz init
// const initPayment = async (paymentData: {
//   total_amount: number;
//   tran_id: string;
// }) => {
//   const { total_amount, tran_id } = paymentData;

//   const data = {
//     total_amount,
//     currency: 'BDT',
//     tran_id,
//     success_url: `${config.sslCommerz.validation_api}?tran_id=${tran_id}`,
//     fail_url: config.sslCommerz.failed_url as string,
//     cancel_url: config.sslCommerz.cancel_url as string,
//     ipn_url: 'http://localhost:5000/api/v1/ssl/ipn',
//     shipping_method: 'Courier',
//     product_name: 'N/A.',
//     product_category: 'N/A',
//     product_profile: 'general',
//     cus_name: 'N/A',
//     cus_email: 'N/A',
//     cus_add1: 'Dhaka',
//     cus_add2: 'Dhaka',
//     cus_city: 'Dhaka',
//     cus_state: 'Dhaka',
//     cus_postcode: '1000',
//     cus_country: 'Bangladesh',
//     cus_phone: '01711111111',
//     cus_fax: '01711111111',
//     ship_name: 'N/A',
//     ship_add1: 'Dhaka',
//     ship_add2: 'Dhaka',
//     ship_city: 'Dhaka',
//     ship_state: 'Dhaka',
//     ship_postcode: 1000,
//     ship_country: 'Bangladesh',
//   };

//   const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

//   try {
//     const paymentResponse = await sslcz.init(data);
//     console.log('SSLCommerz Response:', paymentResponse);
//     return paymentResponse.GatewayPageURL;
//   } catch (error) {
//     console.error('SSLCommerz init error:', error);
//     throw new Error('Payment initiation failed');
//   }
// };

// const validatePaymentService = async (tran_id: string): Promise<boolean> => {
//   const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     //@ts-ignore
//     const validationResponse = await sslcz.transactionQueryByTransactionId({
//       tran_id,
//     });

//     console.log(validationResponse.element);

//     let data;

//     if (
//       validationResponse.element[0].status === 'VALID' ||
//       validationResponse.element[0].status === 'VALIDATED'
//     ) {
//       data = {
//         status: 'Paid',
//         gatewayResponse: validationResponse.element[0],
//       };
//     } else if (validationResponse.element[0].status === 'INVALID_TRANSACTION') {
//       data = {
//         status: 'Failed',
//         gatewayResponse: validationResponse.element[0],
//       };
//     } else {
//       data = {
//         status: 'Failed',
//         gatewayResponse: validationResponse.element[0],
//       };
//     }

//     const updatedPayment = await Payment.findOneAndUpdate(
//       { transactionId: validationResponse.element[0].tran_id },
//       data,
//       { new: true, session },
//     );

//     if (!updatedPayment) {
//       throw new Error('Payment not updated');
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       updatedPayment?.order,
//       {
//         paymentStatus: data.status,
//       },
//       { new: true, session },
//     ).populate('user product');

//     if (!updatedOrder) {
//       throw new Error('Order not updated');
//     }

//     if (data.status === 'Failed') {
//       throw new Error('Payment failed');
//     }

//     // Commit transaction only if no errors occurred
//     await session.commitTransaction();
//     session.endSession();

//     console.log('email');

//     const pdfBuffer = await generateOrderInvoicePDF(updatedOrder);
//     const emailContent = await EmailHelper.createEmailContent(
//       //@ts-ignore
//       { userName: updatedOrder.user.name || '' },
//       'orderInvoice',
//     );

//     const attachment = {
//       filename: `Invoice_${updatedOrder._id}.pdf`,
//       content: pdfBuffer,
//       encoding: 'base64',
//     };

//     await EmailHelper.sendEmail(
//       //@ts-ignore
//       updatedOrder.user.email,
//       emailContent,
//       'Order confirmed-Payment Success!',
//       attachment,
//     );

//     return true;
//   } catch (error) {
//     // Only abort the transaction if an error occurred
//     await session.abortTransaction();
//     session.endSession();

//     console.error(error); // Log the error for debugging
//     return false;
//   }
// };

// export const sslService = {
//   initPayment,
//   validatePaymentService,
// };

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import SSLCommerzPayment from 'sslcommerz-lts';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { EmailHelper } from '../../app/utils/emailHelper';
import { generateOrderInvoicePDF } from '../../app/utils/generateOrderInvoicePDF';
import { Payment } from '../Payment/payment.model';
import { Order } from '../Order/order.model';
import Cart from '../Cart/cart.model';

const app = express();

const store_id = config.sslCommerz.store_id as string;
const store_passwd = config.sslCommerz.store_password as string;
const is_live = false;

// SSLCommerz init
const initPayment = async (paymentData: {
  total_amount: number;
  tran_id: string;
}) => {
  const { total_amount, tran_id } = paymentData;

  const data = {
    total_amount,
    currency: 'BDT',
    tran_id,
    success_url: `${config.sslCommerz.validation_api}?tran_id=${tran_id}`,
    fail_url: config.sslCommerz.failed_url as string,
    cancel_url: config.sslCommerz.cancel_url as string,
    ipn_url: 'https://shalfordco-server.vercel.app/api/v1/ssl/ipn',
    shipping_method: 'Courier',
    product_name: 'N/A.',
    product_category: 'N/A',
    product_profile: 'general',
    cus_name: 'N/A',
    cus_email: 'N/A',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'N/A',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    const paymentResponse = await sslcz.init(data);
    console.log('SSLCommerz Response:', paymentResponse);
    return paymentResponse.GatewayPageURL;
  } catch (error) {
    console.error('SSLCommerz init error:', error);
    throw new Error('Payment initiation failed');
  }
};

const validatePaymentService = async (tran_id: string): Promise<boolean> => {
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if payment already validated
    const existingPayment = await Payment.findOne({
      transactionId: tran_id,
      status: 'Paid',
    }).session(session);

    if (existingPayment) {
      console.log('Payment already validated for:', tran_id);
      await session.commitTransaction();
      return true;
    }

    //@ts-ignore
    const validationResponse = await sslcz.transactionQueryByTransactionId({
      tran_id,
    });

    console.log(validationResponse.element);

    if (
      !validationResponse.element ||
      validationResponse.element.length === 0
    ) {
      throw new Error('No validation response received');
    }

    let data;
    const transactionStatus = validationResponse.element[0].status;

    if (transactionStatus === 'VALID' || transactionStatus === 'VALIDATED') {
      data = {
        status: 'Paid',
        gatewayResponse: validationResponse.element[0],
      };
    } else if (transactionStatus === 'INVALID_TRANSACTION') {
      data = {
        status: 'Failed',
        gatewayResponse: validationResponse.element[0],
      };
    } else {
      data = {
        status: 'Failed',
        gatewayResponse: validationResponse.element[0],
      };
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: validationResponse.element[0].tran_id },
      data,
      { new: true, session },
    );

    if (!updatedPayment) {
      throw new Error('Payment not found for transaction: ' + tran_id);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      updatedPayment?.order,
      {
        paymentStatus: data.status,
      },
      { new: true, session },
    ).populate('user product');

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    if (data.status === 'Failed') {
      throw new Error('Payment validation failed');
    }
    if (data.status === 'Paid') {
      // Clear user's cart
      await Cart.deleteMany({ user: updatedOrder.user._id }).session(session);
    }

    // Commit transaction before sending email
    await session.commitTransaction();
    console.log('Transaction committed successfully');

    // Send email after transaction is committed
    try {
      console.log('Sending email...');
      const pdfBuffer = await generateOrderInvoicePDF(updatedOrder);
      const emailContent = await EmailHelper.createEmailContent(
        //@ts-ignore
        { userName: updatedOrder.user.name || '' },
        'orderInvoice',
      );

      const attachment = {
        filename: `Invoice_${updatedOrder._id}.pdf`,
        content: pdfBuffer,
        encoding: 'base64',
      };

      await EmailHelper.sendEmail(
        //@ts-ignore
        updatedOrder.user.email,
        emailContent,
        'Order confirmed-Payment Success!',
        attachment,
      );
      console.log('Email sent successfully');
    } catch (emailError) {
      // Log email error but don't fail the payment validation
      console.error('Email sending failed:', emailError);
    }

    return true;
  } catch (error) {
    // Only abort if transaction is still active
    if (session.inTransaction()) {
      console.log('Aborting transaction due to error');
      await session.abortTransaction();
    }

    console.error('Payment validation error:', error);
    return false;
  } finally {
    // Always end session
    session.endSession();
  }
};

export const sslService = {
  initPayment,
  validatePaymentService,
};
