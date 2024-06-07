import CourseEntity from '../entities/course.entity';
import { BaseAbstractRepository } from '../repositories/base/base.abstract.repository';

export interface CourseRepositoryInterface
  extends BaseAbstractRepository<CourseEntity> {}
