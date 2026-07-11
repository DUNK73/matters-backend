import * as dotenv from 'dotenv';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

console.log('__dirname: ',__dirname);

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Создаем транспортер для Yandex
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // true для 465 порта (SSL)
  auth: {
    user: process.env.YANDEX_EMAIL,
    pass: process.env.YANDEX_APP_PASSWORD,
  },
});

@Injectable()
export class MailService {
  public readonly mailToArray = [
    'z7dank3@yandex.ru',
    'z7dunk3@gmail.com',
    'julia-zakharova_@mail.ru',
  ];

  public getMailTo(): string {
    return this.mailToArray.join(';');
  }

  // Функция отправки письма
  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: process.env.YANDEX_EMAIL, // ВАЖНО: должен совпадать с auth.user
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Письмо отправлено:', info.response);
      return info;
    } catch (error: any) {
      console.error('❌ Ошибка отправки:', error.message);
      throw error;
    }
  }
}
