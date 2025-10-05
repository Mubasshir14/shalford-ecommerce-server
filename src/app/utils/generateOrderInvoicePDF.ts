// /* eslint-disable no-async-promise-executor */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import fs from 'fs';
// import path from 'path';
// import { IOrder } from '../../modules/Order/order.interface';

// /**
//  * Generates a PDF invoice for an order.
//  * @param {IOrder} order - The order object to generate the invoice for.
//  * @returns {Promise<Buffer>} - The generated PDF as a Buffer.
//  */
// export const generateOrderInvoicePDF = async (
//   order: IOrder,
// ): Promise<Buffer> => {
//   return new Promise<Buffer>(async (resolve, reject) => {
//     try {
//       // ✅ Local logo path
//       const logoPath = path.join(process.cwd(), '/src/assets/company.png');
//       let logoBuffer: Buffer;

//       try {
//         // First try local logo
//         logoBuffer = fs.readFileSync(logoPath);
//         console.log('Using local logo from:', logoPath);
//       } catch {
//         // If local not found, fallback to remote URL
//         const logoUrl = 'https://i.ibb.co.com/4Zbx7zjx/sk2.png'; 
//         console.log('Local logo not found, downloading from:', logoUrl);
//         const response = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//         logoBuffer = Buffer.from(response.data);
//       }

//       // Start PDF doc
//       const doc = new PDFDocument({ margin: 50 });
//       const buffers: Buffer[] = [];
//       //@ts-ignore
//       doc.on('data', (chunk) => buffers.push(chunk));
//       doc.on('end', () => resolve(Buffer.concat(buffers)));
//       doc.on('error', (err: Error) => reject(err));

//       // ---------- Header ----------
//       const logoWidth = 70;
//       const logoX = (doc.page.width - logoWidth) / 2;
//       doc.image(logoBuffer, logoX, doc.y, { width: logoWidth });
//       doc.moveDown(6);

//       doc.fontSize(20).font('Helvetica-Bold').fillColor('#000000').text('MUNJIA FASHION', { align: 'center' });
//       doc.fontSize(10).text('Level-4, 34, Awal Centre, Banani, Dhaka', { align: 'center' });
//       doc.fontSize(10).text('Email: munjiafashion@gmail.com', { align: 'center' });
//       doc.fontSize(10).text('Phone: + 06 223 456 678', { align: 'center' });
//       doc.moveDown(0.5);
//       doc.fontSize(15).font('Helvetica-Bold').fillColor('#003366').text('Invoice', { align: 'center' });
//       doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
//       doc.moveDown(0.5);

//       // ---------- Invoice Details ----------
//       doc.fontSize(11).fillColor('#000000').text(`Invoice ID: ${order._id}`);
//       doc.text(`Order Date: ${(order.createdAt as Date).toLocaleDateString()}`);
//       doc.moveDown(0.5);
//       //@ts-ignore
//       doc.text(`Customer Name: ${order.user.name}`);
//       doc.text(`Shipping Address: ${order.shippingAddress}`);
//       doc.moveDown(1);

//       // ---------- Payment Details ----------
//       doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Payment Details:', { underline: true });
//       doc.text(`Payment Status: ${order.paymentStatus}`);
//       doc.text(`Payment Method: ${order.paymentMethod}`);
//       doc.moveDown(1);

//       // ---------- Products ----------
//       doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Order Products:', { underline: true });
//       doc.moveDown(1);

//       const tableTop = doc.y;
//       const tableHeight = 20;

//       doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Product Name', 50, tableTop);
//       doc.text('Quantity', 300, tableTop);
//       doc.text('Price', 450, tableTop);
//       doc.lineWidth(0.5).moveTo(50, tableTop + tableHeight).lineTo(550, tableTop + tableHeight).stroke();

//       let currentY = tableTop + tableHeight + 5;

//       order.product.forEach((item) => {
//         //@ts-ignore
//         const productName = item.oder?.product?.name || 'Product 1';
//         const quantity = item.quantity;
//         //@ts-ignore
//         const price = item.unitPrice * quantity || 0;

//         doc.fontSize(11).fillColor('#000000').text(productName, 50, currentY, { width: 130, align: 'left' });
//         doc.text(quantity.toString(), 280, currentY, { width: 90, align: 'center' });
//         doc.text(price.toFixed(2), 400, currentY, { width: 90, align: 'right' });
//         currentY += tableHeight;
//       });

//       doc.lineWidth(0.5).moveTo(50, currentY).lineTo(550, currentY).stroke();

//       // ---------- Pricing ----------
//       doc.moveDown(2);
//       const pricingTableTop = doc.y;

//       doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('Description', 50, pricingTableTop);
//       doc.text('Amount', 450, pricingTableTop);
//       doc.lineWidth(0.5).moveTo(50, pricingTableTop + tableHeight).lineTo(550, pricingTableTop + tableHeight).stroke();

//       let pricingY = pricingTableTop + tableHeight + 5;

//       doc.fontSize(11).fillColor('#000000').text('Sub Total', 50, pricingY, { width: 200 });
//       doc.text(`${order.totalAmount.toFixed(2)} /-`, 400, pricingY, { width: 90, align: 'right' });
//       pricingY += tableHeight;

//       doc.fontSize(11).fillColor('#000000').text('Delivery Charge', 50, pricingY, { width: 200 });
//       doc.text(`${order.deliveryCharge.toFixed(2)} /-`, 400, pricingY, { width: 90, align: 'right' });
//       pricingY += tableHeight;

//       doc.lineWidth(0.5).moveTo(50, pricingY).lineTo(550, pricingY).stroke();

//       // ---------- Footer ----------
//       doc.moveDown(3);
//       doc.fontSize(9).text('Thank you for shopping!');
//       doc.fontSize(9).fillColor('#003366').text('- MUNJIA FASHION', { align: 'center' });

//       // End document
//       doc.end();
//     } catch (err) {
//       reject(err);
//     }
//   });
// };


/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PDFDocument from 'pdfkit';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { IOrder } from '../../modules/Order/order.interface';

/**
 * Generates a modern, professional PDF invoice for an order.
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
        const logoUrl = 'https://i.ibb.co.com/4Zbx7zjx/sk2.png'; 
        console.log('Local logo not found, downloading from:', logoUrl);
        const response = await axios.get(logoUrl, { responseType: 'arraybuffer' });
        logoBuffer = Buffer.from(response.data);
      }

      // Start PDF doc with better margins
      const doc = new PDFDocument({ 
        margin: 50,
        size: 'A4',
        bufferPages: true
      });
      const buffers: Buffer[] = [];
      //@ts-ignore
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err: Error) => reject(err));

      // ---------- Modern Header with Brand Colors ----------
      // Top colored bar
      doc.rect(0, 0, doc.page.width, 120)
         .fill('#FF8C00'); // Orange/Amber gradient effect
      
      // Logo
      const logoWidth = 80;
      const logoX = 50;
      doc.image(logoBuffer, logoX, 30, { width: logoWidth });

      // Company Info (Right Side)
      doc.fontSize(22)
         .font('Helvetica-Bold')
         .fillColor('#FFFFFF')
         .text('MUNJIA FASHION', 200, 35, { align: 'right' });
      
      doc.fontSize(9)
         .font('Helvetica')
         .fillColor('#FFFFFF')
         .text('Level-4, 34, Awal Centre, Banani, Dhaka', 200, 65, { align: 'right' })
         .text('Email: munjiafashion@gmail.com', 200, 80, { align: 'right' })
         .text('Phone: +880 1234 567 890', 200, 95, { align: 'right' });

      doc.moveDown(3);

      // ---------- Invoice Title Section ----------
      doc.rect(50, 140, doc.page.width - 100, 60)
         .fillAndStroke('#F5F5F5', '#E0E0E0');

      doc.fontSize(24)
         .font('Helvetica-Bold')
         .fillColor('#FF8C00')
         .text('INVOICE', 70, 155);

      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#666666')
         .text(`Invoice #: INV-${order._id?.toString().slice(-8).toUpperCase() || 'N/A'}`, 70, 180);

      // Date on right side
      doc.fontSize(10)
         .fillColor('#666666')
         .text(`Date: ${(order.createdAt as Date).toLocaleDateString('en-US', { 
           year: 'numeric', 
           month: 'long', 
           day: 'numeric' 
         })}`, 350, 155, { align: 'right' });

      doc.text(`Payment Status: ${order.paymentStatus}`, 350, 175, { align: 'right' });

      doc.moveDown(2);

      // ---------- Customer & Shipping Info ----------
      const infoBoxY = 220;
      
      // Bill To Box
      doc.rect(50, infoBoxY, 240, 80)
         .fillAndStroke('#FFFFFF', '#E0E0E0');

      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#FF8C00')
         .text('BILL TO:', 60, infoBoxY + 10);

      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#000000')
         //@ts-ignore
         .text(order.user?.name || 'N/A', 60, infoBoxY + 30, { width: 220 })
         .text(order.shippingAddress || 'N/A', 60, infoBoxY + 45, { width: 220 });

      // Payment Details Box
      doc.rect(305, infoBoxY, 240, 80)
         .fillAndStroke('#FFFFFF', '#E0E0E0');

      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#FF8C00')
         .text('PAYMENT DETAILS:', 315, infoBoxY + 10);

      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#000000')
         .text(`Method: ${order.paymentMethod}`, 315, infoBoxY + 30)
         .text(`Status: ${order.paymentStatus}`, 315, infoBoxY + 50);

      doc.moveDown(3);

      // ---------- Products Table ----------
      const tableTop = 320;
      const tableHeight = 25;

      // Table Header with colored background
      doc.rect(50, tableTop, doc.page.width - 100, tableHeight)
         .fill('#FF8C00');

      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#FFFFFF')
         .text('PRODUCT NAME', 60, tableTop + 8, { width: 200 })
         .text('QTY', 280, tableTop + 8, { width: 60, align: 'center' })
         .text('UNIT PRICE', 360, tableTop + 8, { width: 80, align: 'right' })
         .text('TOTAL', 460, tableTop + 8, { width: 80, align: 'right' });

      let currentY = tableTop + tableHeight + 10;
      let rowColor = true;

      order.product.forEach((item) => {
        //@ts-ignore
        const productName = item.oder?.product?.name || 'Product';
        const quantity = item.quantity;
        //@ts-ignore
        const unitPrice = item.unitPrice || 0;
        const total = unitPrice * quantity;

        // Alternate row colors
        if (rowColor) {
          doc.rect(50, currentY - 5, doc.page.width - 100, tableHeight)
             .fill('#F9F9F9');
        }
        rowColor = !rowColor;

        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#000000')
           .text(productName, 60, currentY, { width: 200, ellipsis: true })
           .text(quantity.toString(), 280, currentY, { width: 60, align: 'center' })
           .text(`৳ ${unitPrice.toFixed(2)}`, 360, currentY, { width: 80, align: 'right' })
           .text(`৳ ${total.toFixed(2)}`, 460, currentY, { width: 80, align: 'right' });

        currentY += tableHeight;
      });

      // Table bottom border
      doc.moveTo(50, currentY)
         .lineTo(doc.page.width - 50, currentY)
         .strokeColor('#E0E0E0')
         .stroke();

      // ---------- Pricing Summary ----------
      currentY += 30;
      const summaryX = 350;
      const summaryWidth = 190;

      // Summary box
      doc.rect(summaryX, currentY, summaryWidth, 100)
         .fillAndStroke('#F5F5F5', '#E0E0E0');

      currentY += 15;

      // Subtotal
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#000000')
         .text('Subtotal:', summaryX + 15, currentY)
         .text(`৳ ${order.totalAmount.toFixed(2)}`, summaryX + 15, currentY, { 
           width: summaryWidth - 30, 
           align: 'right' 
         });

      currentY += 20;

      // Delivery Charge
      doc.text('Delivery Charge:', summaryX + 15, currentY)
         .text(`৳ ${order.deliveryCharge.toFixed(2)}`, summaryX + 15, currentY, { 
           width: summaryWidth - 30, 
           align: 'right' 
         });

      currentY += 25;

      // Divider
      doc.moveTo(summaryX + 15, currentY)
         .lineTo(summaryX + summaryWidth - 15, currentY)
         .strokeColor('#000000')
         .lineWidth(1)
         .stroke();

      currentY += 10;

      // Grand Total
      const grandTotal = order.totalAmount + order.deliveryCharge;
      
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor('#FF8C00')
         .text('TOTAL AMOUNT:', summaryX + 15, currentY)
         .text(`৳ ${grandTotal.toFixed(2)}`, summaryX + 15, currentY, { 
           width: summaryWidth - 30, 
           align: 'right' 
         });

      // ---------- Footer ----------
      const footerY = doc.page.height - 100;
      
      // Divider line
      doc.moveTo(50, footerY)
         .lineTo(doc.page.width - 50, footerY)
         .strokeColor('#E0E0E0')
         .stroke();

      // Thank you message
      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#FF8C00')
         .text('Thank you for shopping with us!', 50, footerY + 15, { 
           align: 'center' 
         });

      doc.fontSize(9)
         .font('Helvetica')
         .fillColor('#666666')
         .text('For any queries, please contact us at munjiafashion@gmail.com or +880 1234 567 890', 
           50, footerY + 35, { 
             align: 'center',
             width: doc.page.width - 100
           });

      // Company name at bottom
      doc.fontSize(10)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('MUNJIA FASHION', 50, footerY + 60, { align: 'center' });

      // End document
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};