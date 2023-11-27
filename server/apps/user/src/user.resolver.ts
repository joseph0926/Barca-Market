import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SignupRes } from './types/user.types';
import { SignupDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => SignupRes)
  async signup(@Args('signupInput') signupDto: SignupDto): Promise<SignupRes> {
    if (!signupDto.name || !signupDto.email || !signupDto.password) {
      throw new BadRequestException('필수 입력값이 유효하지 않습니다.');
    }

    const user = await this.userService.signup(signupDto);
    return { user };
  }

  @Query(() => [User])
  async getAllUser() {
    return this.userService.getAllUsers();
  }
}
