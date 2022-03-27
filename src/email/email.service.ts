import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    await this.sendGrid.send({
      to,
      from: process.env.EMAIL_HOST,
      subject,
      text,
    });
  }
}
