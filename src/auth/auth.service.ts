import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  public async registerUser(registerUserDto: CreateUserDto) {
    try {
      const { userName, email, password, age, mobile, address } =
        registerUserDto;
      // hash the password to store in the database
      const hashedPassword = await this.hashPassword(password);
      // create user
      const userData = {
        ...registerUserDto,
        password: hashedPassword,
      };
      const user = await this.userService.createUser(userData);
      return { statusCode: 201, data: user };
    } catch (error) {
      console.log('error while creating a new user', error);
      return { statusCode: 400, message: error.message };
    }
  }

  public async loginUser(loginDto: LoginUserDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return { status: 400, message: 'User not found' };
      }
      console.log('check password', password);
      console.log('storedPassword', user.password);

      const isPasswordMatch = await this.validatePassword(
        password,
        user.password,
      );
      console.log("isPasswordMatch", isPasswordMatch)
      if (!isPasswordMatch) {
        return { status: 400, message: 'Invalid password' };
      }
      const payload = { email: user.email, sub: user.id };
      const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
      const token = await this.jwtService.signAsync(payload, {
        secret: secretKey,
      });
      console.log("token", token)
      return { status: 200, message: 'Login success', token: token };
    } catch (error) {
      console.log('error while login the user', error);
      return {
        status: 400,
        message: 'Error while fetching the user',
        error: error,
      };
    }
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }

  async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    const encpass = await bcrypt.compare(password, storedPasswordHash);
    if (!encpass) {
      throw new UnauthorizedException();
    }
    return encpass;
  }

  // hashPassword
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 14);
  }
}
