import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Doctor } from '../entities/doctor.entity';
import { GetDoctorsQueryDto } from './dto/get-doctor-query.dto';
import { GetTimeSlotsQueryDto } from '../time-slot/dto/get-time-slot.dto';
import { TimeSlot } from '../entities/time-slot.entity';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/addnew')
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'Doctor created successfully', type: Doctor })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'List all doctors with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'specialization', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Doctors fetched successfully' })
  findAllDoctors(@Query() query: GetDoctorsQueryDto) {
    return this.doctorService.findAllDoctors(query);
  }

  @Get(':id/available/time-slots')
  @ApiOperation({ summary: 'Get available time slots for a doctor' })
  @ApiParam({ name: 'id', description: 'Doctor UUID' })
  @ApiQuery({ name: 'date', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Doctor availability fetched successfully', type: [TimeSlot] })
  @ApiResponse({ status: 404, description: 'Doctor or time slots not found' })
  findAvailability(@Param('id') id: string, @Query() query: GetTimeSlotsQueryDto) {
    return this.doctorService.findDoctorAvailability(id, query);
  }
}
