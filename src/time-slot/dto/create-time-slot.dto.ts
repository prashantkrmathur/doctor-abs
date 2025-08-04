import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeSlotDto {
  @ApiProperty({ description: 'UUID of the doctor', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ description: 'Start time of the slot in ISO 8601 format', example: '2025-08-05T09:00:00Z' })
  @IsDateString({}, { message: 'startTime must be a valid ISO 8601 date-time string (e.g., 2025-08-05T09:00:00Z)' })
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ description: 'End time of the slot in ISO 8601 format', example: '2025-08-05T09:30:00Z' })
  @IsDateString({}, { message: 'endTime must be a valid ISO 8601 date-time string (e.g., 2025-08-05T09:30:00Z)' })
  @IsNotEmpty()
  endTime: string;
}