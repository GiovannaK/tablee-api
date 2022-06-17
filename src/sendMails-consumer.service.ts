import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { DoneCallback, Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('email-send')
export class SendMailsConsumer {
  constructor(private sendGrid: SendGridService) {}

  @Process('email-job')
  async sendMailJob(
    job: Job<{ to: string; subject: string; text: string }>,
    done: DoneCallback,
  ) {
    console.log('heeere');
    try {
      const { data } = job;
      await this.sendGrid.send({
        to: data.to,
        from: process.env.SENDGRID_EMAIL_HOST,
        subject: data.subject,
        text: data.text,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @OnQueueError()
  onError(job: Job, err: Error) {
    console.log(`On Error ${job.name} ${err}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`);
  }
}
