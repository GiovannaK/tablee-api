import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 200)
  firstName?: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 200)
  lastName?: string;

  @IsOptional()
  @Field()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Field()
  @Length(10, 11)
  mainPhone?: string;

  @IsOptional()
  @Field({ nullable: true })
  @Length(10, 11)
  secondaryPhone?: string;
}
