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
      headers: {
        title: string;
      }
      content: {
        [key: string]: string;
      }
    }
  ): Promise<any> {

    let contentTextArray = Object.keys(data.content).map((key) => `${key}: ${data.content[key]}`);
    let contentText = contentTextArray.join('');

    let contentHtmlArray = Object.keys(data.content).map((key) => `<p><strong>${key}</strong>: ${data.content[key]}</p>`);
    let contentHtml = contentHtmlArray.join('');

    this.mailService.sendEmail(
      this.mailService.getMailTo(),
      `Matters: ${data.headers.title}`,
      contentText,
      contentHtml
    )

    return { success: true };
  }

}
