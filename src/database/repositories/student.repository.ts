import { Repository } from 'typeorm';
import StudentEntity from '../entities/student.entity';
import { StudentRepositoryInterface } from '../interfaces/student.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';

export default class StudentRepository
  extends BaseAbstractRepository<StudentEntity>
  implements StudentRepositoryInterface
{
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {
    super(studentRepository);
  }

  async getAllByCourse(
    active: boolean,
    courseId: number,
  ): Promise<StudentEntity[]> {
    return await this.studentRepository
      .createQueryBuilder('s')
      .innerJoinAndSelect('s.course', 'c')
      .where('s.active = :active', { active })
      .andWhere('c.id = :courseId', { courseId })
      .getMany();
  }
}
