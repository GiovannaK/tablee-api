import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StripeCreateAccountLink {
  @Field()
  object: string;

  @Field()
  url: string;
}
