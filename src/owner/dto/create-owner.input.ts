import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @Field()
  @IsString()
  @Length(1, 200)
  firstName: string;

  @Field()
  @IsString()
  @Length(1, 200)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(10, 11)
  mainPhone?: string;

  @IsOptional()
  @Field({ nullable: true })
  @Length(10, 11)
  secondaryPhone?: string;
}
