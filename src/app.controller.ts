import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    console.log(`
      process.env.YANDEX_EMAIL ${process.env.YANDEX_EMAIL}
      process.env.YANDEX_APP_PASSWORD ${process.env.YANDEX_APP_PASSWORD}
      `);

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
      headers: {
        title: string;
      };
      content: {
        [key: string]: string;
      };
    },
  ): Promise<any> {
    const contentTextArray = Object.keys(data.content).map(
      (key) => `${key}: ${data.content[key]}`,
    );
    const contentText = contentTextArray.join('');

    const contentHtmlArray = Object.keys(data.content).map(
      (key) => `<p><strong>${key}</strong>: ${data.content[key]}</p>`,
    );
    const contentHtml = contentHtmlArray.join('');

    const result = await this.mailService.sendEmail(
      this.mailService.getMailTo(),
      `Matters: ${data.headers.title}`,
      contentText,
      contentHtml,
    );

    return { success: true, result: result };
  }
}
