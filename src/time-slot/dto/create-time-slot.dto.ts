import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTimeSlotDto {
    @IsNotEmpty()
    @IsUUID()
    doctorId: string;

    @IsNotEmpty()
    @IsDate()
    startTime: Date;

    @IsNotEmpty()
    @IsDate()
    endTime: Date;
}
