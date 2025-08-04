import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlot } from '../entities/time-slot.entity';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class TimeSlotService {
  constructor(
    // Injecting the repositories for TimeSlot and Doctor entities
    @InjectRepository(TimeSlot)
    private readonly timeSlotRepository: Repository<TimeSlot>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}
  public async createTimeSlot(createTimeSlotDto: CreateTimeSlotDto) {
    try {
      const { doctorId, startTime, endTime } = createTimeSlotDto;

      // Check if the doctor exists
      const doctor = await this.doctorRepository.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }

      // Validate startTime and endTime presence
      if (!startTime || !endTime) {
        throw new BadRequestException('Start time and end time are required');
      }

      // Convert to Date objects if they are strings
      const start = new Date(startTime);
      const end = new Date(endTime);

      // Validate that times are not in the past
      const now = new Date();
      if (start < now || end < now) {
        throw new BadRequestException(
          'Start time and end time cannot be in the past',
        );
      }

      // Validate that startTime is before endTime
      if (start >= end) {
        throw new BadRequestException('Start time must be before end time');
      }

      // Validate minimum duration of 20 minutes (20 * 60 * 1000 = 1,200,000 milliseconds)
      const durationMs = end.getTime() - start.getTime();
      const minDurationMs = 20 * 60 * 1000; // 20 minutes in milliseconds
      if (durationMs < minDurationMs) {
        throw new BadRequestException(
          'Time slot must be at least 20 minutes long',
        );
      }

      // Check if the time slot already exists for the doctor
      const existingTimeSlot = await this.timeSlotRepository.findOne({
        where: {
          doctor: { id: doctorId },
          startTime: start,
          endTime: end,
        },
      });

      if (existingTimeSlot) {
        throw new BadRequestException(
          'Time slot already exists for this doctor',
        );
      }

      // Create and save the new time slot
      const timeSlot = new TimeSlot()
      timeSlot.doctorId = doctorId;
      timeSlot.startTime = start;
      timeSlot.endTime = end;
      timeSlot.isAvailable = true; // Assuming the time slot is available when created

      const createdTimeSlot = await this.timeSlotRepository.save(timeSlot);

      return {
        statusCode: 201,
        message: 'Time slot created successfully for doctor',
        data: createdTimeSlot,
      };
    } catch (error) {
      console.log("Error while creating a new time slot", error);
      // Handle any errors that occur during the creation process
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error; // Re-throw known exceptions
      }
      // For any other errors, return a generic error response
      return { statusCode: 400, data: null };
    }
  }
}
