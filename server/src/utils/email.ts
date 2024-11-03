import dotenv from 'dotenv';
import pug from 'pug';
import { htmlToText } from 'html-to-text';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { UserDocument } from '../types';

dotenv.config();

export const Email = class Email {
  private to: string;
  private firstName: string;
  private url: string;
  private from: string;

  constructor(user: UserDocument, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Rosa Hadi <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    const transportConfig =
      process.env.NODE_ENV === 'production'
        ? {
            service: 'Gmail',
            auth: {
              user: process.env.GMAIL_USERNAME,
              pass: process.env.GMAIL_PASSWORD,
            },
          }
        : {
            host: process.env.EMAIL_HOST,
            port: +process.env.EMAIL_PORT!,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
          };

    return nodemailer.createTransport(transportConfig as SMTPTransport.Options);
  }

  // Send the actual email
  async send(template: string, subject: string) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Pênûs');
  }

  async sendPasswordReset() {
    try {
      await this.send(
        'passwordReset',
        'Your password reset token (valid for only 10 minutes)',
      );
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
};
