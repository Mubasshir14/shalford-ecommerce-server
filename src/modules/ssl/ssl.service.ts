/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import httpStatus from "http-status";
import { IPaymentData } from "./ssl.interface";

import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../app/config";
import AppError from "../../app/errors/AppError";

const store_id = config.sslCommerz.store_id as string;
const store_passwd = config.sslCommerz.store_password as string;
const is_live = false;

const initPayment = async (paymentData: IPaymentData) => {
  try {
    const data = {
      store_id: config.sslCommerz.store_id,
      store_passwd: config.sslCommerz.store_password,
      total_amount: paymentData.amount,
      currency: "BDT",
      tran_id: paymentData.transactionId,
      success_url: `${config.sslCommerz.validation_api}?tran_id=${paymentData.transactionId}`,
      fail_url: config.sslCommerz.failed_url,
      cancel_url: config.sslCommerz.failed_url,
      ipn_url: "https://shalford-client.vercel.app/ipn",
      shipping_method: "N/A",
      product_name: "Appointment",
      product_category: "Service",
      product_profile: "general",
      cus_name: paymentData.name,
      cus_email: paymentData.email,
      cus_add1: paymentData.address,
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: paymentData.phoneNumber,
      cus_fax: "01711111111",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: 1000,
      ship_country: "N/A",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    try {
      const apiResponse = await sslcz.init(data as any);

      const GatewayPageURL = apiResponse.GatewayPageURL;
      
      if (GatewayPageURL) {
        return GatewayPageURL;
      } else {
        throw new AppError(500, "Failed to generate payment gateway URL.");
      }
    } catch (error) {
      throw new AppError(500, "An error occurred while processing payment.");
    }
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment error occured!");
  }
};


export const SSLService = {
  initPayment,
};
