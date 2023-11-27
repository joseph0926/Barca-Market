import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class ErrorType {
  @Field()
  message: string;
  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class SignupRes {
  @Field(() => User, { nullable: true })
  user?: User | any;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class SigninRes {
  @Field(() => User)
  user: User;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
