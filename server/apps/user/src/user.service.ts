import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const user = {
      name,
      email,
      password,
    };

    return user;
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = {
      email,
      password,
    };

    return user;
  }

  async getAllUsers() {
    const users = [
      {
        id: '1',
        name: 'test',
        email: 'test@test.com',
        password: '12345678',
      },
    ];
    return users;
  }
}
