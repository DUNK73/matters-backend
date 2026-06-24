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
      email: string,
      name: string,
      phone: string,
      message: string,
    }
  ): Promise<any> {
    const html = `
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Телефон:</strong> ${data.phone}</p>
      <p><strong>Сообщение:</strong> ${data.message}</p>
    `;

    await this.mailService.sendEmail(
      'z7dank3@yandex.ru',
      'Наявка з сайту',
      `Имя: ${data.name}, Email: ${data.email}, Телефон: ${data.phone}, Сообщение: ${data.message}`,
      html
    );

    return { success: true };
  }


  @Post('signCourses')
  async signCourses(
    @Body()
    data: {
      theme: string,
      email: string,
      name: string,
      phone: string,
      message: string,
    }
  ): Promise<any> {

    let contentTextArray = Object.keys(data).map((key) => `${key}: ${data[key]}`);
    let contentText = contentTextArray.join('');

    let contentHtmlArray = Object.keys(data).map((key) => `<p>${key}: ${data[key]}</p>`);
    let contentHtml = contentHtmlArray.join('');

    this.mailService.sendEmail(
      this.mailService.getMailTo(),
      'Matters: Запись на курс',
      contentText,
      contentHtml
    )

  }
}
