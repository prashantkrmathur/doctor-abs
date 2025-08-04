import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsUUID()
    doctorId: string;

    @IsNotEmpty()
    @IsUUID()
    timeSlotId: string;

    @IsNotEmpty()
    patientName: string;

    @IsNotEmpty()
    patientEmail: string;
}
