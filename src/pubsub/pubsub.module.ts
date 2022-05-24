import { Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUB_SUB = 'PUB_SUB';
@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () =>
        new RedisPubSub({
          connection: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            db: process.env.REDIS_NAME,
            lazyConnect: true,
            connectTimeout: 10000,
            maxRetriesPerRequest: 3,
          },
        }),
    },
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
