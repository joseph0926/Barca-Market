import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignupDto {
  @Field()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @IsString({ message: '이름은 string이어야 합니다.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail({}, { message: '이메일이 유효하지 않습니다.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야합니다.' })
  password: string;
}

@InputType()
export class SigninDto {
  @Field()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail({}, { message: '이메일이 유효하지 않습니다.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
