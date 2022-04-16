import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
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
import * as Joi from '@hapi/joi';

@Module({
  imports: [
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
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    EmailModule,
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_SECRET_KEY,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
