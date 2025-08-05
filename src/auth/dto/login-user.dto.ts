import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"Login using user email and password" , example: "john.doe@example.com"})
    email : string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"Login using user password", example: "StrongPass123!"})
    password: string
}