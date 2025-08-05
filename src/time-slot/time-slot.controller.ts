import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimeSlot } from '../entities/time-slot.entity';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('TimeSlot')
@Controller('time-slot')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard)
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
