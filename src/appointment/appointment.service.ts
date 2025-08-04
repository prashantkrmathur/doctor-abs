// src/appointments/appointments.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from 'src/entities/appointment.entity';
import { TimeSlot } from 'src/entities/time-slot.entity';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ) {
    try {
      const { doctorId, timeSlotId, patientName, patientEmail } =
        createAppointmentDto;

      // Check if time slot exists and is available
      const timeSlot = await this.timeSlotRepository.findOne({
        where: { id: timeSlotId, doctorId, isAvailable: true },
      });

      if (!timeSlot) {
        throw new BadRequestException(
          'Time slot is not available or does not exist.',
        );
      }

      // Check for overlapping time slots for the same doctor
      const overlappingSlot = await this.timeSlotRepository
        .createQueryBuilder('timeSlot')
        .where('timeSlot.doctorId = :doctorId', { doctorId })
        .andWhere('timeSlot.isAvailable = :isAvailable', { isAvailable: false })
        .andWhere(
          '(:startTime BETWEEN timeSlot.startTime AND timeSlot.endTime OR :endTime BETWEEN timeSlot.startTime AND timeSlot.endTime)',
          { startTime: timeSlot.startTime, endTime: timeSlot.endTime },
        )
        .getOne();

      if (overlappingSlot) {
        throw new ConflictException(
          'The selected time slot overlaps with an existing booking.',
        );
      }

      // Mark time slot as booked and availability as false
      timeSlot.isAvailable = false;
      await this.timeSlotRepository.save(timeSlot);

      // Create appointment
      const appointment = this.appointmentRepository.create({
        doctorId,
        timeSlotId,
        patientName,
        patientEmail,
        status: 'Scheduled',
      });

      const createdAppointment = await this.appointmentRepository.save(
        appointment,
      );

      return {statusCode: 201, message: 'Appointment created successfully', data: createdAppointment };
    } catch (error) {
      console.log("error while creating appointment", error);
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error; // Re-throw known exceptions
      }
      throw new BadRequestException('An error occurred while creating the appointment.');
    }
  }

  async findAllAppointments(query: {
    page?: number;
    limit?: number;
    status?: string;
    doctorId?: string;
  }) {
    try {
      const page = query.page || 1;
      const limit = query.limit || 10;
      const skip = (page - 1) * limit;
  
      const where: any = {};
  
      if (query.status) where.status = query.status;
      if (query.doctorId) where.doctor = { id: query.doctorId };
  
      const [appointments, total] = await this.appointmentRepository.findAndCount({
        relations: ['doctor', 'timeSlot'],
        where,
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
      });
  
      return {
        statusCode: 200,
        message: 'Appointments retrieved successfully',
        data: appointments,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new BadRequestException('An error occurred while retrieving appointments.');
    }
  }  

  public async updateAppointmentStatus(
    appointmentId: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ){
    try {
      
    } catch (error) {
      
    }
  }
}
