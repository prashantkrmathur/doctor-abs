import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  public async createUser(userData : CreateUserDto){
    try {
      const createdUser = await this.userRepository.save(userData);
      console.log("created user", createdUser);
      return createdUser
    } catch (error) {
      console.log("error while creating a new user", error);
      return error.message
    }
  }

  public async findUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        select: ['id', 'userName', 'email', 'password', 'role'], // include password
      });

    } catch (error) {
      console.log("error while fetching user by email", error)
      return error.message
    }
  }

  public async findUserByMobile(mobile : string) {
    try {
      const user = await this.userRepository.findOne({
        where: {mobile}
      })
      console.log("get user by mobile", user);
      return user
    } catch (error) {
      console.log("error while fetching user by email", error)
      return error.message
    }
  }

  async getUserProfile(request) {
    try {
      console.log("request", request.user);
      const user = await this.getUserById(request.user.sub)
      return { statuscode: 200, user: user };
    } catch (error) {
      console.log("error while getting profile", error);
      return error;
    }
  }

  async getUserById(id) {
    try {
      return await this.userRepository.findOne({
        where: { id: id },
      })
    } catch (error) {

    }
  }
}
