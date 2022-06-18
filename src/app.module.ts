import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ProfileModule } from './profile/profile.module';
import { GoogleauthModule } from './googleauth/googleauth.module';
import { StripeModule } from './stripe/stripe.module';
import { OwnerModule } from './owner/owner.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ImagesModule } from './images/images.module';
import { ManagerModule } from './manager/manager.module';
import { PermissionModule } from './permission/permission.module';
import { EmployeeModule } from './employee/employee.module';
import { AddressModule } from './address/address.module';
import { MenuModule } from './menu/menu.module';
import { BookingModule } from './booking/booking.module';
import { TableModule } from './table/table.module';
import { ReviewModule } from './review/review.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { CancellationModule } from './cancellation/cancellation.module';
import { CancellationorderModule } from './cancellationorder/cancellationorder.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { BookingtableModule } from './bookingtable/bookingtable.module';
import * as Joi from '@hapi/joi';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
@Global()
@Module({
  providers: [AppService],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXP_TIME: Joi.string().required(),
        SENDGRID_SECRET_KEY: Joi.string().required(),
        SENDGRID_EMAIL_HOST: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_DEFAULT_REGION: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_QUEUE_HOST,
        port: Number(process.env.REDIS_QUEUE_PORT),
        password: process.env.REDIS_QUEUE_PASSWORD,
        username: process.env.REDIS_QUEUE_USERNAME,
        name: process.env.REDIS_QUEUE_NAME,
        lazyConnect: true,
        connectTimeout: 10000,
        maxRetriesPerRequest: 3,
      },
    }),
    BullModule.registerQueue({
      name: 'email-send',
    }),
    TypeOrmModule.forRoot(),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_SECRET_KEY,
    }),
    UserModule,
    AuthModule,
    FileModule,
    ProfileModule,
    GoogleauthModule,
    StripeModule,
    OwnerModule,
    RestaurantModule,
    ImagesModule,
    ManagerModule,
    PermissionModule,
    EmployeeModule,
    AddressModule,
    MenuModule,
    BookingModule,
    TableModule,
    ReviewModule,
    PubsubModule,
    CancellationModule,
    CancellationorderModule,
    WaitlistModule,
    FavoriteModule,
    BookingtableModule,
  ],
  exports: [AppService],
})
export class AppModule {
  constructor(@InjectQueue('email-send') private sendMailQueue: Queue) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.sendMailQueue)]);
    consumer.apply(router).forRoutes('/admin/queues');
  }
}
