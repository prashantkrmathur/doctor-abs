import { IsDate, IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTimeSlotDto {
    @IsNotEmpty()
    @IsUUID()
    doctorId: string;

    @IsNotEmpty()
    @IsDateString()
    startTime: Date;

    @IsNotEmpty()
    @IsDateString()
    endTime: Date;
}
