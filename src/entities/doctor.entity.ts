import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TimeSlot } from "./time-slot.entity";


// Database schema for Doctor Table
@Entity()
export class Doctor {
    @PrimaryGeneratedColumn('uuid') // Using UUID for better uniqueness across distributed systems
    id: string;

    @Column()
    name: string;

    @Column()
    specialization: string;

    @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.doctor) // One doctor can have multiple time slots
    timeSlots: TimeSlot[];

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
