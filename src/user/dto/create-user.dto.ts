import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Gender } from "src/entities/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: "Username of the user", example: "john_doe"})
    userName: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({description: "Password of the user", example: "StrongPass123!"})
    password: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description: "Email of the user", example: "john.doe@example.com"})
    email: string;

    @IsOptional()
    @IsMobilePhone()
    @ApiProperty({description: "Mobile phone number of the user", example: "+91 1234567890"})
    mobile?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({description: "Age of the user", example: 25})
    age?: Number;

    @IsOptional()
    @IsString()
    @ApiProperty({description: "Address of the user", example: "123 Main St, City, Country"})
    address?: string;

    @IsOptional()
    @IsEnum(Gender)
    @ApiProperty({description: "Gender of the user", example: "Male", enum: Gender})
    gender?:Gender

}
