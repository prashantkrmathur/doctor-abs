import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    static save(userData: CreateUserDto) {
      throw new Error('Method not implemented.');
    }
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsMobilePhone()
    mobile?: string;

    @IsNotEmpty()
    @IsNumber()
    age?: Number;

    @IsNotEmpty()
    @IsString()
    address?: string;




}
