import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
    @ApiProperty({ description: 'Full name of the doctor', example: 'Dr. Jane Doe' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'Medical specialization of the doctor', example: 'Dermatologist' })
    @IsNotEmpty()
    @IsString()
    specialization: string;
}

