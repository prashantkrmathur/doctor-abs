import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Doctor } from '../entities/doctor.entity';
import { TimeSlot } from '../entities/time-slot.entity';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepo = dataSource.getRepository(User);
  const doctorRepo = dataSource.getRepository(Doctor);
  const slotRepo = dataSource.getRepository(TimeSlot);
  const appointmentRepo = dataSource.getRepository(Appointment);

  // Seed User
  const user = userRepo.create({
     userName: 'john', 
     password: 'password123',
     email: 'john@example.com' ,
     age:25, 
     address:"New area Nawada Bihar",
     mobile: "+918340303400"
    });
  await userRepo.save(user);

  // Seed Doctor
  const doctor = doctorRepo.create({ name: 'Dr. Strange', specialization: 'Neurology' });
  await doctorRepo.save(doctor);
  const doctorId = doctor.id; // Store the doctor ID for later use
  // Seed Time Slot
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  
  const startTime = new Date(tomorrow); // default: same time as now, but next day
  const endTime = new Date(tomorrow);
  endTime.setHours(endTime.getHours() + 1); // assuming a 1-hour slot
  
  const timeSlot = slotRepo.create({
    startTime,
    endTime,
    doctorId,
  });
  await slotRepo.save(timeSlot);

  // Seed Appointment
  const timeSlotId = timeSlot.id; // Store the time slot ID for later use
  // Assuming the user has already been created and is available in the userRepo
  if (!user || !doctor || !timeSlot) {
    console.error('User, Doctor, or Time Slot not found. Cannot create appointment.');
    await app.close();
    return;
  }
  const appointmentObj = {
    patientName: user.userName,
    patientEmail: user.email,
    doctorId,
    timeSlotId,
  }
  const appointment = appointmentRepo.create(appointmentObj);
  await appointmentRepo.save(appointment);

  console.log('✅ Seeding complete!');
  await app.close();
}

bootstrap();
