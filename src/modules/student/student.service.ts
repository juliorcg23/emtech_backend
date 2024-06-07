import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import StudentEntity from 'src/database/entities/student.entity';
import { StudentRepositoryInterface } from 'src/database/interfaces/student.repository.interface';
import StudentDTO from 'src/dto/student.dto';
import { Not } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @Inject('StudentRepositoryInterface')
    private readonly studentRepository: StudentRepositoryInterface,
  ) {}

  async getStudents(active = true, courseid?: number) {
    if (courseid)
      return await this.studentRepository.getAllByCourse(active, courseid);

    return await this.studentRepository.findAll({
      relations: ['course'],
      where: {
        active,
      },
    });
  }

  async getStudent(id: number) {
    return await this.studentRepository.findWithRelations({
      relations: ['course'],
      where: {
        id,
      },
    });
  }

  async createStudent(studentData: StudentDTO) {
    try {
      const studentExistsByIdNumber = await this.studentRepository.findOneBy({
        id_number: studentData.id_number,
      });

      const studentExistsByEmail = await this.studentRepository.findOneBy({
        email: studentData.email,
      });

      if (studentExistsByIdNumber)
        throw new BadRequestException(
          'El número de identificación proporcionado ya existe',
        );

      if (studentExistsByEmail)
        throw new BadRequestException(
          'El correo electrónico proporcionado ya existe',
        );

      const studentEntity = new StudentEntity(studentData);

      console.log(studentEntity);

      return await this.studentRepository.save(studentEntity);
    } catch (e: any) {
      if (e.statusCode === '400') throw e;

      return e;
    }
  }

  async updateStudent(id: number, studentData: StudentDTO) {
    try {
      const studentEntity = this.studentRepository.findOneById(id);

      if (!studentEntity)
        throw new BadRequestException('El estudiante no existe');

      const studentExistsByEmail = await this.studentRepository.findByCondition(
        {
          where: {
            id: Not(id),
            email: studentData.email,
          },
        },
      );

      const studentExistsByIdNumber = await this.studentRepository.findOneBy({
        id: Not(id),
        id_number: studentData.id_number,
      });

      if (studentExistsByEmail)
        throw new BadRequestException(
          'El correo electrónico proporcionado ya existe',
        );

      if (studentExistsByIdNumber)
        throw new BadRequestException(
          'El número de identificación proporcionado ya existe',
        );

      return await this.studentRepository.update(id, studentData);
    } catch (e: any) {
      if (e.statusCode === '400') throw e;

      return e;
    }
  }

  async deleteStudent(id: number) {
    try {
      const student = await this.studentRepository.findOneById(id);

      if (!student) throw new BadRequestException('El estudiante no existe');

      return await this.studentRepository.remove(student);
    } catch (e: any) {
      if (e.statusCode === '400') throw e;

      return e;
    }
  }
}
