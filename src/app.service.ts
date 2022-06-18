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

  // sendMailSendgrid = async (to: string, subject: string, text: string) => {
  //   const sendMail = await this.sendGrid.send({
  //     to,
  //     from: process.env.SENDGRID_EMAIL_HOST,
  //     subject,
  //     text,
  //   });
  //   console.log('sendMail', sendMail);
  //   return sendMail;
  // };
  // async sendMail(to: string, subject: string, text: string) {
  //   await this.queue.add('email-job', { to, subject, text });
  //   await this.queue.process(async (job, done) => {
  //     await this.sendMail(job.data.to, job.data.subject, job.data.text);
  //     done();
  //   });
  // }
}
