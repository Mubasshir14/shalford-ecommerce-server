/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import config from '../config';

interface OrderEmailPayload {
  id: string;
  name: string;
  email: string;
  phone?: string;
  transactionId: any;
  amount: number;
  status: string;
}

export const sendOrderUpdateEmail = async (payload: OrderEmailPayload) => {
  try {
    const { id, name, email, phone, transactionId, amount, status } = payload;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.from_email,
        pass: config.from_pass,
      },
    });

    // const html = `
    //   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    //     <h2 style="color: #003366;">Hello ${name},</h2>
    //     <p>Your order has been updated. Here are the details:</p>

    //     <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
    //       <tr>
    //         <td style="border: 1px solid #ccc; padding: 8px;"><strong>Invoice ID</strong></td>
    //         <td style="border: 1px solid #ccc; padding: 8px;">${id}</td>
    //       </tr>
    //       <tr>
    //         <td style="border: 1px solid #ccc; padding: 8px;"><strong>Transaction ID</strong></td>
    //         <td style="border: 1px solid #ccc; padding: 8px;">${transactionId}</td>
    //       </tr>
    //       <tr>
    //         <td style="border: 1px solid #ccc; padding: 8px;"><strong>Status</strong></td>
    //         <td style="border: 1px solid #ccc; padding: 8px;">${status}</td>
    //       </tr>
    //       <tr>
    //         <td style="border: 1px solid #ccc; padding: 8px;"><strong>Amount</strong></td>
    //         <td style="border: 1px solid #ccc; padding: 8px;">${amount} BDT</td>
    //       </tr>
    //       <tr>
    //         <td style="border: 1px solid #ccc; padding: 8px;"><strong>Email</strong></td>
    //         <td style="border: 1px solid #ccc; padding: 8px;">${email}</td>
    //       </tr>
    //       <tr>
    //         <td style="border: 1px solid #ccc; padding: 8px;"><strong>Phone</strong></td>
    //         <td style="border: 1px solid #ccc; padding: 8px;">${phone || 'N/A'}</td>
    //       </tr>
    //     </table>

    //     <p style="margin-top: 20px;">
    //       You can track your order using the transaction ID above on our
    //       <a href="https://shalford-client.vercel.app/user/dassboard/track-order">Order Tracking Page</a>.
    //     </p>

    //     <p style="margin-top: 30px; color: #003366;"><strong>Thank you for shopping with Shalford & Co.!</strong></p>
    //   </div>
    // `;

    const html = `
<div style="font-family: 'Sarabun', sans-serif; line-height: 1.6; color: #333; background-color: #fff8f0; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); padding: 30px;">
    
    <!-- Company Logo/Header -->
    <div style="text-align: center; padding-bottom: 20px; margin-bottom: 10px; border-bottom: 1px solid #FCD34D;">
      <h1 style="color: #B45309; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: 1px;">Shalford & Co.</h1>
      <p style="font-size: 12px; color: #92400E; margin-top: 5px;">Modern Essentials</p>
    </div>

    <!-- Greeting -->
    <h2 style="color: #B45309; font-size: 24px; margin-top: 30px; margin-bottom: 10px;">🎉 Hello ${name},</h2>
    <p style="font-size: 16px; color: #444;">Great news! Your order status has been <strong style="color:#B45309;">updated</strong>. Here are the details:</p>

    <!-- Highlighted Status Block -->
    <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 15px 20px; margin-top: 25px; text-align: center;">
  <p style="font-size: 18px; color: #065F46; font-weight: 700; margin: 0;">
    📦 Current Status: 
    <span style="color: #059669;">
      ${status === 'completed' ? 'Delivered' : status}
    </span>
  </p>
</div>

    <!-- Order Information Table -->
    <h3 style="font-size: 18px; color: #B45309; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px dotted #FCD34D; padding-bottom: 5px;">Order Information</h3>
    <table style="border-collapse: collapse; width: 100%; font-size: 14px; border-radius: 8px; overflow: hidden; border: 1px solid #FCD34D;">
      <tr style="background-color:#FFFBEB;">
        <td style="padding: 12px; font-weight: 600; border-right: 1px solid #FCD34D;">🧾 Invoice ID</td>
        <td style="padding: 12px;">${id}</td>
      </tr>
      <tr style="background-color:#FEF3C7;">
        <td style="padding: 12px; font-weight: 600; border-right: 1px solid #FCD34D; border-top: 1px solid #FCD34D;">💳 Transaction ID</td>
        <td style="padding: 12px; border-top: 1px solid #FCD34D;">${transactionId}</td>
      </tr>
      <tr style="background-color:#FFFBEB;">
        <td style="padding: 12px; font-weight: 600; border-right: 1px solid #FCD34D; border-top: 1px solid #FCD34D;">💰 Amount</td>
        <td style="padding: 12px; border-top: 1px solid #FCD34D;">${amount} BDT</td>
      </tr>
      <tr style="background-color:#FEF3C7;">
        <td style="padding: 12px; font-weight: 600; border-right: 1px solid #FCD34D; border-top: 1px solid #FCD34D;">📧 Email</td>
        <td style="padding: 12px; border-top: 1px solid #FCD34D;">${email}</td>
      </tr>
      <tr style="background-color:#FFFBEB;">
        <td style="padding: 12px; font-weight: 600; border-right: 1px solid #FCD34D; border-top: 1px solid #FCD34D;">📞 Phone</td>
        <td style="padding: 12px; border-top: 1px solid #FCD34D;">${phone || 'N/A'}</td>
      </tr>
    </table>

    <!-- Track Order Section -->
    <p style="margin-top: 25px; font-size: 16px; color: #444; text-align: center;">Use your Transaction ID to track your order.</p>
    <div style="text-align: center; margin-top: 15px;">
      <a 
        href="https://shalford-client.vercel.app/user/dassboard/track-order"
        style="display:inline-block; background-color:#FCD34D; color:#78350F; font-weight: 600; text-decoration:none; padding:15px 30px; border-radius:10px; font-size:16px; box-shadow: 0 4px 10px rgba(252, 211, 77, 0.5); transition: background-color 0.3s;"
      >
        🔎 Track Your Order
      </a>
    </div>

    <!-- Footer / Thank you -->
    <p style="margin-top: 40px; font-size:14px; color:#92400E; text-align: center; border-top: 1px solid #FCD34D; padding-top: 20px;">
      ✨ Thank you for shopping with <strong>Shalford & Co.</strong>! We appreciate your business.
    </p>
  </div>
</div>
`;

    await transporter.sendMail({
      from: `"Shalford & Co." <${config.from_email}>`,
      to: email,
      subject: `Order Update: ${transactionId}`,
      html,
    });

    console.log('Order update email sent successfully!');
  } catch (err) {
    console.error('Error sending order update email:', err);
  }
};
