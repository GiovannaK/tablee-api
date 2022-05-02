import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StripeCreateAccountLinkInput {
  @Field()
  id: string;
}
