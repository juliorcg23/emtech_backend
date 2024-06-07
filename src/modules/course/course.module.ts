import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from 'src/database/repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import CourseEntity from 'src/database/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CourseController],
  providers: [
    CourseService,
    {
      provide: 'CourseRepositoryInterface',
      useClass: CourseRepository,
    },
  ],
})
export class CourseModule {}
