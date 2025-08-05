import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Appointment } from '../entities/appointment.entity';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Appointment')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('/new')
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ status: 201, description: 'Appointment created successfully', type: Appointment })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'List all doctors with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({name: 'status', required: false, type: String})
  @ApiQuery({name: 'doctorId', required: false, type: String})
  @ApiResponse({ status: 200, description: 'Appointments fetched successfully', type: [Appointment] })
  findAllAppointments(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('doctorId') doctorId?: string,
  ) {
    return this.appointmentService.findAllAppointments({
      page: Number(page),
      limit: Number(limit),
      status,
      doctorId,
    });
  }

  @Patch('/update-status/:appointmentId')
  @ApiOperation({ summary: 'Update the status of an appointment' })
  @ApiResponse({ status: 200, description: 'Appointment status updated successfully', type: Appointment })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  updateAppointmentStatus(
    @Param('appointmentId') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.updateAppointmentStatus(id, updateAppointmentDto);
  }



  
}
