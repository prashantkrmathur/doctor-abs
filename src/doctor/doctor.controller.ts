import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Get('/all')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('specialization') specialization?: string,
    @Query('name') name?: string,
  ) {
    return this.doctorService.findAllDoctors({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      specialization,
      name,
    });
  }

  @Get(':id/time-slots')
  findDoctorAvailability(
    @Query('Date') date:string,
    @Param('id') id: string) {
    return this.doctorService.findDoctorAvailability(id, {date});
  }

}
