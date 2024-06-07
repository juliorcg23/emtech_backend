import StudentEntity from '../entities/student.entity';
import { BaseAbstractRepository } from '../repositories/base/base.abstract.repository';

export interface StudentRepositoryInterface
  extends BaseAbstractRepository<StudentEntity> {
  getAllByCourse(active: boolean, courseId: number): Promise<StudentEntity[]>;
}
