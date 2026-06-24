import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// Создаем транспортер для Yandex
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // true для 465 порта (SSL)
  auth: {
    user: process.env.YANDEX_EMAIL,
    pass: process.env.YANDEX_APP_PASSWORD
  }
});


@Injectable()
export class MailService {

  getHello(): string {
    return 'Hello World!';
  }

  // Функция отправки письма
  async sendEmail(to, subject, text, html) {
    const mailOptions = {
      from: process.env.YANDEX_EMAIL, // ВАЖНО: должен совпадать с auth.user
      to: to,
      subject: subject,
      text: text,
      html: html
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


  // Пример использования
  async main() {
    await this.sendEmail(
      'z7dank3@yandex.ru',
      'Тестовое письмо из Node.js',
      'Это текстовая версия письма',
      '<h1>Привет!</h1><p>Это HTML версия письма из Node.js через Yandex Mail</p>'
    );
  }

}
