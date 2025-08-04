import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimeSlot } from '../entities/time-slot.entity';

@ApiTags('TimeSlot')
@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post('/doctor')
  @ApiOperation({ summary: 'Create a new available timeslot for a doctor' })
  @ApiResponse({ status: 201, description: 'Doctor created successfully', type: TimeSlot })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTimeSlot(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotService.createTimeSlot(createTimeSlotDto);
  }
}
