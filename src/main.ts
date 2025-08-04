import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const allowedOrigins = [];
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.setGlobalPrefix('api');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Doctor Appointment Booking System')
    .setDescription('API for managing doctors, time slots, and appointments')
    .setVersion('1.0')
    .addTag('Doctor', 'Endpoints for managing doctors')
    .addTag('TimeSlot', 'Endpoints for managing time slots')
    .addTag('Appointment', 'Endpoints for managing appointments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();