/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Product from '../../modules/Product/product.model';

/**
 * Generates a visually appealing PDF invoice for an order with an Amber theme.
 * @param {IOrder} order - The order object to generate the invoice for.
 * @param {any} tran_id - The transaction ID associated with the order.
 * @returns {Promise<Buffer>} - The generated PDF as a Buffer.
 */
export const generateOrderInvoicePDF = async (
  order: IOrder,
  tran_id: any,
): Promise<Buffer> => {
  console.log(order);
  return new Promise<Buffer>(async (resolve, reject) => {
    console.log(order);

    const productIds = order.product.map((p: any) => p.product);

    const productsFromDB = await Product.find({
      _id: { $in: productIds },
    }).select('name price');

    const productMap = productsFromDB.reduce((acc: any, p: any) => {
      acc[p._id.toString()] = p;
      return acc;
    }, {});
    try {
      // --- Style Constants for Amber Theme (Inspired by Sansita's warmth) ---
      const ACCENT_COLOR = '#CD853F'; // Peru - Rich Gold/Amber for headers
      const PRIMARY_TEXT_COLOR = '#333333'; // Deep charcoal for main text
      const SECONDARY_TEXT_COLOR = '#666666'; // Muted grey for details
      const LINE_COLOR = '#E0E0E0'; // Light grey for subtle lines
      const FONT_NORMAL = 'Helvetica';
      const FONT_BOLD = 'Helvetica-Bold';
      const TABLE_ROW_HEIGHT = 25;

      // --- Logo Loading Logic ---
      const logoPath = path.join(process.cwd(), '/src/assets/company.png');
      let logoBuffer: Buffer;

      try {
        logoBuffer = fs.readFileSync(logoPath);
        console.log('Using local logo from:', logoPath);
      } catch {
        const logoUrl = 'https://i.ibb.co.com/4Zbx7zjx/sk2.png';
        console.log('Local logo not found, downloading from:', logoUrl);
        const response = await axios.get(logoUrl, {
          responseType: 'arraybuffer',
        });
        logoBuffer = Buffer.from(response.data);
      }

      // --- PDF Document Setup ---
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      //@ts-ignore
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err: Error) => reject(err));

      // --------------------------------------------------------------------------------
      // ---------- Header (Logo & Company Info) ----------------------------------------
      // --------------------------------------------------------------------------------

      const logoWidth = 70;
      const logoX = 50;
      // Place logo on the left
      doc.image(logoBuffer, logoX, doc.y, { width: logoWidth });

      const headerY = doc.y - 45; // Calculate position to align text with the top of the logo

      // Company Info aligned right
      doc
        .fillColor(ACCENT_COLOR)
        .font(FONT_BOLD)
        .fontSize(24)
        .text('MUNJIA FASHION', 50, headerY, { align: 'right' });
      doc.moveDown(0.2);
      doc
        .fillColor(SECONDARY_TEXT_COLOR)
        .font(FONT_NORMAL)
        .fontSize(10)
        .text('Level-4, 34, Awal Centre, Banani, Dhaka', { align: 'right' });
      doc.text('Email: munjiafashion@gmail.com | Phone: + 06 223 456 678', {
        align: 'right',
      });

      doc.moveDown(2.5);

      // Invoice Title Banner
      doc.fillColor(ACCENT_COLOR).rect(50, doc.y, 500, 30).fill();
      doc
        .fillColor('#FFFFFF')
        .font(FONT_BOLD)
        .fontSize(18)
        .text('INVOICE', 50, doc.y + 7, { align: 'center' });
      doc.moveDown(2);

      // --------------------------------------------------------------------------------
      // ---------- Invoice and Customer Details (Two Columns) --------------------------
      // --------------------------------------------------------------------------------

      const detailY = doc.y;

      // Left Column: Invoice Details
      doc
        .fillColor(PRIMARY_TEXT_COLOR)
        .font(FONT_BOLD)
        .fontSize(11)
        .text('INVOICE DETAILS', 50, detailY);
      doc
        .font(FONT_NORMAL)
        .fontSize(10)
        .text(`ID: ${order._id}`, 50, detailY + 15)
        .text(`Transaction ID: ${tran_id}`, 50, detailY + 30) // New: Added Transaction ID
        .text(
          `Date: ${(order.createdAt as Date).toLocaleDateString()}`,
          50,
          detailY + 45,
        ); // Adjusted offset
      doc.moveDown(1);
      doc.font(FONT_BOLD).text('Payment Status:', 50, detailY + 60); // Adjusted offset
      doc.font(FONT_NORMAL).text(`${'Paid'}`, 50, detailY + 75); // Adjusted offset

      // Right Column: Customer/Shipping
      doc
        .fillColor(PRIMARY_TEXT_COLOR)
        .font(FONT_BOLD)
        .fontSize(11)
        .text('SHIPPING TO', 300, detailY);
      doc.font(FONT_NORMAL).fontSize(10);
      // @ts-ignore
      doc.text(order.user.name, 300, detailY + 15);
      doc.text(order.shippingAddress, 300, detailY + 30, { width: 250 });

      doc.moveDown(5); // Move down past the details block

      // --------------------------------------------------------------------------------
      // ---------- Products Table ------------------------------------------------------
      // --------------------------------------------------------------------------------

      const tableTop = doc.y;
      const columnPositions = [50, 320, 420, 500]; // StartX, QuantityX, UnitPriceX, TotalX

      // Table Header Background (Soft Accent)
      doc.fillColor('#F5F5F5').rect(50, tableTop, 500, TABLE_ROW_HEIGHT).fill();

      // Table Header Text
      doc.fillColor(ACCENT_COLOR).font(FONT_BOLD).fontSize(12);
      doc.text('Product Name', columnPositions[0], tableTop + 7, {
        width: 250,
      });
      doc.text('Qty', columnPositions[1], tableTop + 7, { align: 'center' });
      doc.text('Unit Price', columnPositions[2], tableTop + 7, {
        align: 'center',
      });
      doc.text('Total', columnPositions[3], tableTop + 7, { align: 'right' });

      let currentY = tableTop + TABLE_ROW_HEIGHT;

      doc.font(FONT_NORMAL).fontSize(10).fillColor(PRIMARY_TEXT_COLOR);

      // order.product.forEach((item, index) => {
      //   // Subtle row striping for better readability
      //   if (index % 2 === 1) {
      //     doc
      //       .fillColor('#FAFAFA')
      //       .rect(50, currentY, 500, TABLE_ROW_HEIGHT)
      //       .fill();
      //   }

      //   // --- Product Name Extraction ---
      //   // Assuming the product name is deeply nested or directly available on the item
      //   // @ts-ignore
      //   const productName =
      //     item.oder?.product?.name || 'Product ' + (index + 1); // Uses product name from order item
      //   const quantity = item.quantity;
      //   // @ts-ignore
      //   const unitPrice = item.unitPrice || 0;
      //   const price = unitPrice * quantity;

      //   doc
      //     .fillColor(PRIMARY_TEXT_COLOR)
      //     .font(FONT_NORMAL)
      //     .text(productName, columnPositions[0], currentY + 7, { width: 250 });
      //   doc.text(quantity.toString(), columnPositions[1], currentY + 7, {
      //     align: 'center',
      //   });
      //   doc.text(unitPrice.toFixed(2), columnPositions[2], currentY + 7, {
      //     align: 'center',
      //   });
      //   doc
      //     .font(FONT_BOLD)
      //     .text(price.toFixed(2), columnPositions[3], currentY + 7, {
      //       align: 'right',
      //     });

      //   currentY += TABLE_ROW_HEIGHT;
      // });

      // Draw bottom line for the table

      order.product.forEach((item: any, index: number) => {
        if (index % 2 === 1) {
          doc
            .fillColor('#FAFAFA')
            .rect(50, currentY, 500, TABLE_ROW_HEIGHT)
            .fill();
        }

        const productData = productMap[item.product.toString()];
        const productName = productData?.name || `Product ${index + 1}`;
        const unitPrice = item.unitPrice || productData?.price || 0;
        const quantity = item.quantity || 1;
        const price = unitPrice * quantity;

        doc
          .fillColor(PRIMARY_TEXT_COLOR)
          .font(FONT_NORMAL)
          .text(productName, columnPositions[0], currentY + 7, { width: 250 });
        doc.text(quantity.toString(), columnPositions[1], currentY + 7, {
          align: 'center',
        });
        doc.text(unitPrice.toFixed(2), columnPositions[2], currentY + 7, {
          align: 'center',
        });
        doc
          .font(FONT_BOLD)
          .text(price.toFixed(2), columnPositions[3], currentY + 7, {
            align: 'right',
          });

        currentY += TABLE_ROW_HEIGHT;
      });

      doc
        .lineWidth(1.5)
        .moveTo(50, currentY)
        .lineTo(550, currentY)
        .stroke(ACCENT_COLOR);

      // --------------------------------------------------------------------------------
      // ---------- Summary & Total Box -------------------------------------------------
      // --------------------------------------------------------------------------------

      doc.moveDown(1.5);

      const summaryX = 350;
      const summaryWidth = 200;
      let summaryY = doc.y;

      // Subtotal and Charges
      doc.font(FONT_NORMAL).fontSize(11).fillColor(PRIMARY_TEXT_COLOR);
      doc.text('Sub Total:', summaryX, summaryY, { width: 100, align: 'left' });
      doc.text(`${order.totalAmount.toFixed(2)} /-`, summaryX + 100, summaryY, {
        width: 90,
        align: 'right',
      });
      summaryY += 18;

      doc.text('Delivery Charge:', summaryX, summaryY, {
        width: 100,
        align: 'left',
      });
      doc.text(
        `${order.deliveryCharge.toFixed(2)} /-`,
        summaryX + 100,
        summaryY,
        { width: 90, align: 'right' },
      );
      summaryY += 25;

      // Final Total Box (Accent Color)
      const finalTotal = order.totalAmount + order.deliveryCharge;
      doc
        .fillColor(ACCENT_COLOR)
        .rect(summaryX, summaryY, summaryWidth, 30)
        .fill();

      doc.fillColor('#FFFFFF').font(FONT_BOLD).fontSize(14);
      doc.text('GRAND TOTAL:', summaryX + 10, summaryY + 8);
      doc.text(`${finalTotal.toFixed(2)} /-`, summaryX + 90, summaryY + 8, {
        width: 100,
        align: 'right',
      });

      // --------------------------------------------------------------------------------
      // ---------- Footer --------------------------------------------------------------
      // --------------------------------------------------------------------------------

      doc.moveDown(6);
      doc
        .lineWidth(0.5)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke(LINE_COLOR);
      doc.moveDown(0.5);

      doc
        .fontSize(10)
        .fillColor(SECONDARY_TEXT_COLOR)
        .font(FONT_NORMAL)
        .text('Thank you for shopping! We appreciate your business.', {
          align: 'center',
        });
      doc.moveDown(0.2);
      doc
        .fontSize(10)
        .fillColor(ACCENT_COLOR)
        .font(FONT_BOLD)
        .text('Invoice generated by MUNJIA FASHION - www.munjiafashion.com', {
          align: 'center',
        });

      // End document
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
