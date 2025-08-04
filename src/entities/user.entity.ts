import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment.entity";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    DOCTOR = 'doctor'
}

export enum Gender{
    Male = 'Male',
    Female = 'Female'
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({ type:"enum", enum: UserRole, default: UserRole.USER }) // Default role is 'user', can be changed to 'admin' or other roles as needed
    role: UserRole;

    @Column()
    email: string;

    @Column()
    mobile:Number;

    @Column()
    age:Number;

    @Column({type:"enum", enum: Gender, default: Gender.Male})
    gender: Gender

    @Column()
    address: string;

    @OneToMany(()=> Appointment, (appointment) => appointment.user) // One user can have multiple appointments
    appointments: Appointment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

