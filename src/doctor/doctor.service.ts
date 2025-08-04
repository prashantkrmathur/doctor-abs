import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from 'src/entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    // necessary dependencies here, like a repository or database service
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ){}
  public async createDoctor(createDoctorDto: CreateDoctorDto) {
    try {
      const {name, specialization} = createDoctorDto
      // Check if a doctor with the same name and specialization already exists
      const existingDoctor = await this.doctorRepository.findOne({
        where: { name, specialization },
      });
      if (existingDoctor) {
        throw new Error('Doctor with this name and specialization already exists');
      }
      // Create a new doctor instance
      const doctor = new Doctor();
      doctor.name = name;   
      doctor.specialization = specialization;
      // Save the doctor to the database
      const createdDoctor = await this.doctorRepository.save(doctor);

      // For example, you can return it like this:
      return {statusCode:201, message: 'Doctor created successfully', data: createdDoctor};
    } catch (error) {
      console.log("error while adding a new doctor", error);
      // Handle any errors that occur during the creation process
      return {statusCode:400, message: error.message, data: null};
    }
  }

  public async findAllDoctors(query: {
    page?: number;
    limit?: number;
    specialization?: string;
    name?: string;
  }) {
    try {
      const { page = 1, limit = 10, specialization, name } = query;
  
      const where: any = {};
  
      if (specialization) {
        where.specialization = specialization;
      }
  
      if (name) {
        where.name = ILike(`%${name}%`);
      }
  
      const [doctors, total] = await this.doctorRepository.findAndCount({
        where,
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC', // optional sorting
        },
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
      console.log('Error while fetching all doctors', error);
      return {
        statusCode: 400,
        message: error.message,
        data: null,
      };
    }
  }
  

  findDoctorAvailability(id: number) {
    return `This action returns a #${id} doctor`;
  }
}
