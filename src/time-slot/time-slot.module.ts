import { Module } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../entities/doctor.entity';
import { TimeSlot } from '../entities/time-slot.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot, Doctor])],
  controllers: [TimeSlotController],
  providers: [TimeSlotService, JwtService],
})
export class TimeSlotModule {}
