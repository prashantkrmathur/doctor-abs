import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from 'src/entities/time-slot.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment,TimeSlot])],
  controllers: [AppointmentController],
  providers: [AppointmentService, JwtService],
})
export class AppointmentModule {}
