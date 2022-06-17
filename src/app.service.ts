import { SendGridService } from '@anchan828/nest-sendgrid';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('email-send') private queue: Queue,
    private sendGrid: SendGridService,
  ) {}

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    await this.sendGrid.send({
      to,
      from: process.env.SENDGRID_EMAIL_HOST,
      subject,
      text,
    });
  }
  // async sendMail(to: string, subject: string, text: string) {
  //   try {
  //     await this.queue.add(
  //       'email-job',
  //       { to, subject, text },
  //       { attempts: 2, delay: 1000 },
  //     );
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
