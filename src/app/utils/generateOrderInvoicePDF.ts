/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PDFDocument from 'pdfkit';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { IOrder } from '../../modules/Order/order.interface';

/**
 * Generates a PDF invoice for an order.
 * @param {IOrder} order - The order object to generate the invoice for.
 * @returns {Promise<Buffer>} - The generated PDF as a Buffer.
 */
export const generateOrderInvoicePDF = async (
  order: IOrder,
): Promise<Buffer> => {
  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      // ✅ Local logo path
      const logoPath = path.join(process.cwd(), '/src/assets/company.png');
      let logoBuffer: Buffer;

      try {
        // First try local logo
        logoBuffer = fs.readFileSync(logoPath);
        console.log('Using local logo from:', logoPath);
      } catch {
        // If local not found, fallback to remote URL
        const logoUrl = 'https://i.ibb.co.com/6JqvBf2D/company.png'; 
        console.log('Local logo not found, downloading from:', logoUrl);
        const response = await axios.get(logoUrl, { responseType: 'arraybuffer' });
        logoBuffer = Buffer.from(response.data);
      }

      // Start PDF doc
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];
      //@ts-ignore
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err: Error) => reject(err));

      // ---------- Header ----------
      const logoWidth = 70;
      const logoX = (doc.page.width - logoWidth) / 2;
      doc.image(logoBuffer, logoX, doc.y, { width: logoWidth });
      doc.moveDown(6);

      doc.fontSize(20).font('Helvetica-Bold').fillColor('#000000').text('Shalford & Co.', { align: 'center' });
      doc.fontSize(10).text('Level-4, 34, Awal Centre, Banani, Dhaka', { align: 'center' });
      doc.fontSize(10).text('Email: support@shalford&co.com', { align: 'center' });
      doc.fontSize(10).text('Phone: + 06 223 456 678', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(15).font('Helvetica-Bold').fillColor('#003366').text('Invoice', { align: 'center' });
      doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      // ---------- Invoice Details ----------
      doc.fontSize(11).fillColor('#000000').text(`Invoice ID: ${order._id}`);
      doc.text(`Order Date: ${(order.createdAt as Date).toLocaleDateString()}`);
      doc.moveDown(0.5);
      //@ts-ignore
      doc.text(`Customer Name: ${order.user.name}`);
      doc.text(`Shipping Address: ${order.shippingAddress}`);
      doc.moveDown(1);

      // ---------- Payment Details ----------
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Payment Details:', { underline: true });
      doc.text(`Payment Status: ${order.paymentStatus}`);
      doc.text(`Payment Method: ${order.paymentMethod}`);
      doc.moveDown(1);

      // ---------- Products ----------
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Order Products:', { underline: true });
      doc.moveDown(1);

      const tableTop = doc.y;
      const tableHeight = 20;

      doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Product Name', 50, tableTop);
      doc.text('Quantity', 300, tableTop);
      doc.text('Price', 450, tableTop);
      doc.lineWidth(0.5).moveTo(50, tableTop + tableHeight).lineTo(550, tableTop + tableHeight).stroke();

      let currentY = tableTop + tableHeight + 5;

      order.product.forEach((item) => {
        //@ts-ignore
        const productName = item.oder?.product?.name || 'Product 1';
        const quantity = item.quantity;
        //@ts-ignore
        const price = item.unitPrice * quantity || 0;

        doc.fontSize(11).fillColor('#000000').text(productName, 50, currentY, { width: 130, align: 'left' });
        doc.text(quantity.toString(), 280, currentY, { width: 90, align: 'center' });
        doc.text(price.toFixed(2), 400, currentY, { width: 90, align: 'right' });
        currentY += tableHeight;
      });

      doc.lineWidth(0.5).moveTo(50, currentY).lineTo(550, currentY).stroke();

      // ---------- Pricing ----------
      doc.moveDown(2);
      const pricingTableTop = doc.y;

      doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Description', 50, pricingTableTop);
      doc.text('Amount', 450, pricingTableTop);
      doc.lineWidth(0.5).moveTo(50, pricingTableTop + tableHeight).lineTo(550, pricingTableTop + tableHeight).stroke();

      let pricingY = pricingTableTop + tableHeight + 5;

      doc.fontSize(11).fillColor('#000000').text('Sub Total', 50, pricingY, { width: 200 });
      doc.text(`${order.totalAmount.toFixed(2)} /-`, 400, pricingY, { width: 90, align: 'right' });
      pricingY += tableHeight;

      doc.fontSize(11).fillColor('#000000').text('Delivery Charge', 50, pricingY, { width: 200 });
      doc.text(`${order.deliveryCharge.toFixed(2)} /-`, 400, pricingY, { width: 90, align: 'right' });
      pricingY += tableHeight;

      doc.lineWidth(0.5).moveTo(50, pricingY).lineTo(550, pricingY).stroke();

      // ---------- Footer ----------
      doc.moveDown(3);
      doc.fontSize(9).text('Thank you for shopping!');
      doc.fontSize(9).fillColor('#003366').text('- NextMert', { align: 'center' });

      // End document
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
