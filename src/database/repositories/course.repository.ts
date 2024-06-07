import { Injectable } from '@nestjs/common';
import CourseEntity from '../entities/course.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseRepositoryInterface } from '../interfaces/course.repository.interface';

@Injectable()
export class CourseRepository
  extends BaseAbstractRepository<CourseEntity>
  implements CourseRepositoryInterface
{
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {
    super(courseRepository);
  }
}
