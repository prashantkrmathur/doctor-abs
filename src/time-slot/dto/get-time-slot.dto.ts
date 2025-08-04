import { IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTimeSlotsQueryDto {
  @ApiProperty({ description: 'Filter by date in YYYY-MM-DD format', example: '2025-08-05', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;
}