import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../entities/doctor.entity';
import { TimeSlot } from '../entities/time-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, TimeSlot])],
  controllers: [DoctorController],
  providers: [DoctorService, ],
})
export class DoctorModule {}
