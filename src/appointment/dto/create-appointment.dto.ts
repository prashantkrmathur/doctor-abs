import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: 'UUID of the doctor',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    doctorId: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: 'UUID of the time slot',
        example: '550e8400-e29b-41d4-a716-446655440001'
    })
    timeSlotId: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Full name of the patient',
        example: 'John Doe'
    })
    patientName: string;

    @IsNotEmpty()
    @ApiProperty({
    description: 'Email address of the patient',
    example: 'john.doe@example.com'
    })
    patientEmail: string;
}
