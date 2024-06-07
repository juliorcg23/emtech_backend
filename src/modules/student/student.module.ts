import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import StudentRepository from 'src/database/repositories/student.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import StudentEntity from 'src/database/entities/student.entity';
import CourseEntity from 'src/database/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, CourseEntity])],
  providers: [
    StudentService,
    {
      provide: 'StudentRepositoryInterface',
      useClass: StudentRepository,
    },
  ],
  controllers: [StudentController],
})
export class StudentModule {}
