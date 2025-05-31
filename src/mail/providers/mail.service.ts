import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    /**
     * Inject configService
     */
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('appConfig.mailHost'),
      port: this.configService.get('appConfig.mailPort'),
      secure: false,
      auth: {
        user: this.configService.get('appConfig.smtpUsername'),
        pass: this.configService.get('appConfig.smtpPassword'),
      },
    });
  }

  async sendEmailWithTemplate(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ) {
    const from = this.configService.get('appConfig.mailFrom');

    const templatePath = path.join(
      process.cwd(),
      'dist',
      'mail',
      'templates',
      `${templateName}.ejs`,
    );
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, context);

    const mailOptions = { from, to, subject, html };
    return await this.transporter.sendMail(mailOptions);
  }
}
