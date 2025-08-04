import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from '../entities/doctor.entity';
import { TimeSlot } from '../entities/time-slot.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(TimeSlot)
    private readonly timeSlotRepository: Repository<TimeSlot>,
  ) {}

  async createDoctor(createDoctorDto: CreateDoctorDto) {
    try {
      const { name, specialization } = createDoctorDto;

      // Check if a doctor with the same name and specialization exists
      const existingDoctor = await this.doctorRepository.findOne({
        where: { name: ILike(name), specialization: ILike(specialization) },
      });

      if (existingDoctor) {
        throw new BadRequestException(
          'Doctor with this name and specialization already exists',
        );
      }

      // Create and save the doctor
      const doctor = this.doctorRepository.create({ name, specialization });
      const createdDoctor = await this.doctorRepository.save(doctor);

      return {
        statusCode: 201,
        message: 'Doctor created successfully',
        data: createdDoctor,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Re-throw known exceptions
      }
      throw new BadRequestException(
        'An error occurred while creating the doctor',
      );
    }
  }

  async findAllDoctors(query: {
    page?: number;
    limit?: number;
    specialization?: string;
    name?: string;
  }) {
    try {
      const { page = 1, limit = 10, specialization, name } = query;

      const where: any = {};
      if (specialization) {
        where.specialization = ILike(`%${specialization}%`);
      }
      if (name) {
        where.name = ILike(`%${name}%`);
      }

      const [doctors, total] = await this.doctorRepository.findAndCount({
        where,
        take: limit,
        skip: (page - 1) * limit,
        order: { createdAt: 'DESC' },
      });

      return {
        statusCode: 200,
        message: 'Doctors fetched successfully',
        data: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          results: doctors,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Re-throw known exceptions
      }
      throw new BadRequestException('An error occurred while fetching doctors');
    }
  }

  async findDoctorAvailability(id: string, query: { date?: string }) {
    try {
      const { date } = query;

      // Fetch doctor with related time slots
      const doctor = await this.doctorRepository.findOne({
        where: { id },
        relations: ['timeSlots'],
      });

      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }

      // Filter available (not booked) and future time slots
      let availableTimeSlots = doctor.timeSlots.filter(
        (slot) => !slot.isAvailable && slot.startTime > new Date(),
      );

      if (availableTimeSlots.length === 0) {
        throw new NotFoundException('No future time slots available');
      }

      // Filter by specific date if provided
      if (date) {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
          throw new BadRequestException('Invalid date format');
        }
        availableTimeSlots = availableTimeSlots.filter((slot) => {
          const slotDate = new Date(slot.startTime);
          return (
            slotDate.getDate() === dateObj.getDate() &&
            slotDate.getMonth() === dateObj.getMonth() &&
            slotDate.getFullYear() === dateObj.getFullYear()
          );
        });

        if (availableTimeSlots.length === 0) {
          throw new NotFoundException(
            'No available time slots for the specified date',
          );
        }
      }

      // Sort time slots by start time
      availableTimeSlots.sort(
        (a, b) => a.startTime.getTime() - b.startTime.getTime(),
      );

      return {
        statusCode: 200,
        message: 'Doctor availability fetched successfully',
        data: availableTimeSlots,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw known exceptions
      }
      throw new BadRequestException(
        'An error occurred while fetching doctor availability',
      );
    }
  }
}
