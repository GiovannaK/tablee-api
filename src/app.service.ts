import { SendGridService } from '@anchan828/nest-sendgrid';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('email-send') private queue: Queue,
    private sendGrid: SendGridService,
  ) {
    this.queue.process(async (job, done) => {
      await this.sendMail(job.data.to, job.data.subject, job.data.text);
      job.moveToCompleted('done', true);
    });
  }

  // async sendMail(to: string, subject: string, text: string): Promise<void> {
  //   await this.sendGrid.send({
  //     to,
  //     from: process.env.SENDGRID_EMAIL_HOST,
  //     subject,
  //     text,
  //   });
  // }

  async addEmailToQueue(to: string, subject: string, text: string) {
    await this.queue.add('email-job', { to, subject, text }, { attempts: 3 });
  }

  async sendMail(to: string, subject: string, text: string, job?: Job) {
    try {
      await this.addEmailToQueue(to, subject, text);
      await this.sendGrid.send({
        to,
        from: process.env.SENDGRID_EMAIL_HOST,
        subject,
        text,
      });
    } catch (error) {
      job.moveToFailed({ message: error });
      throw new InternalServerErrorException('Cannot send email');
    }
  }
}
