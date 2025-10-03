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

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #003366;">Hello ${name},</h2>
        <p>Your order has been updated. Here are the details:</p>

        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>Invoice ID</strong></td>
            <td style="border: 1px solid #ccc; padding: 8px;">${id}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>Transaction ID</strong></td>
            <td style="border: 1px solid #ccc; padding: 8px;">${transactionId}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>Status</strong></td>
            <td style="border: 1px solid #ccc; padding: 8px;">${status}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>Amount</strong></td>
            <td style="border: 1px solid #ccc; padding: 8px;">${amount} BDT</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>Email</strong></td>
            <td style="border: 1px solid #ccc; padding: 8px;">${email}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>Phone</strong></td>
            <td style="border: 1px solid #ccc; padding: 8px;">${phone || 'N/A'}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">
          You can track your order using the transaction ID above on our 
          <a href="https://localhost:3000/user/dassboard/track-order">Order Tracking Page</a>.
        </p>

        <p style="margin-top: 30px; color: #003366;"><strong>Thank you for shopping with Shalford & Co.!</strong></p>
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
