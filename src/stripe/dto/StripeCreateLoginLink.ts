import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StripeCreateLoginLink {
  @Field()
  object: string;

  @Field()
  url: string;
}
