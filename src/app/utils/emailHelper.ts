/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import * as fs from 'fs';
import * as path from 'path';
const Util = require('util');
const ReadFile = Util.promisify(fs.readFile);
const Handlebars = require('handlebars');
import nodemailer from 'nodemailer'
import config from '../config';

const sendEmail = async (
   email: string,
   html: string,
   subject: string,
   attachment?: { filename: string, content: Buffer, encoding: string }
) => {
   try {
      const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false, 
         auth: {
            user: config.from_email,
            pass: config.from_pass,
         },
         tls: {
            rejectUnauthorized: false
         }
      });

      const mailOptions: any = {
         from: '"Shalford & Co." <support@shalford&co.com>',
         to: email,
         subject,
         html,
      };

      if (attachment) {
         mailOptions.attachments = [
            {
               filename: attachment.filename,
               content: attachment.content,
               encoding: attachment.encoding,
            }
         ];
      }

      // Sending the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
   } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
   }
}

const createEmailContent = async (data: object, templateType: string) => {
   try {
      const templatePath = path.join(
         process.cwd(),
         `/src/templates/${templateType}.template.hbs`
      );
      const content = await ReadFile(templatePath, 'utf8');

      const template = Handlebars.compile(content);

      return template(data);
   } catch (error) { }
};

export const EmailHelper = {
   sendEmail,
   createEmailContent
};
