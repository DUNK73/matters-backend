import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): { info: string } {
    return {
      info: 'test',
    };
  }

  @Post('sendMail')
  async sendMail(
    @Body()
    data: {
      d1: string,
    }
  ): Promise<any> {


    require('dotenv').config();
    const nodemailer = require('nodemailer');

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

    // Функция отправки письма
    async function sendEmail(to, subject, text, html) {
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
    async function main() {
      await sendEmail(
        'z7dank3@yandex.ru',
        'Тестовое письмо из Node.js',
        'Это текстовая версия письма',
        '<h1>Привет!</h1><p>Это HTML версия письма из Node.js через Yandex Mail</p>'
      );
    }

    await main();

    return data;
  }


  @Post('signCourses')
  async signCourses(
    @Body()
    data: {
      d1: string,
    }
  ): Promise<any> {

    let contentArray = Object.keys(data).map((key) => `<p>${key}: ${data[key]}</p>`);
    let content = contentArray.join();

    this.mailService.sendEmail(
      'z7dank3@yandex.ru',
      'Записаться на курс',
      'Это текстовая версия письма',
      content
    )

  }
}
