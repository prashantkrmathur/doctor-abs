import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';

@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  async createTimeSlot(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotService.createTimeSlot(createTimeSlotDto);
  }
}
