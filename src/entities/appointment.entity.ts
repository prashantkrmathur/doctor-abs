import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Doctor } from './doctor.entity';
import { TimeSlot } from './time-slot.entity';
import { User } from './user.entity';

// Database schema for Appointment Table
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctorId: string;

  @Column()
  timeSlotId: string;

  @Column()
  patientName: string;

  @Column()
  patientEmail: string;

  @Column({ type: 'enum', enum: ['Scheduled', 'Cancelled', 'Completed'], default: 'Scheduled' }) // Enum for appointment status
  status: string;

  @ManyToOne(() => Doctor) // Many appointments can belong to one doctor
  doctor: Doctor;

  @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.appointments)  // Many appointments can belong to one time slot
  timeSlot: TimeSlot;

  @ManyToOne(()=> User, (user) => user.appointments) // Many appointments can belong to one user
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}