import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "./doctor.entity";
import { Appointment } from "./appointment.entity";

// Database schema for TimeSlot Table
@Entity()
export class TimeSlot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    doctorId: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column({ default: true })
    isAvailable: boolean;

    @ManyToOne(() => Doctor, (doctor) => doctor.timeSlots) // Many time slots can belong to one doctor
    doctor: Doctor;

    @OneToMany(() => Appointment, (appointment) => appointment.timeSlot) // One time slot can have multiple appointments
    appointments: Appointment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}