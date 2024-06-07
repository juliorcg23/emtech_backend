import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import CourseEntity from 'src/database/entities/course.entity';
import { CourseRepositoryInterface } from 'src/database/interfaces/course.repository.interface';
import CourseDTO from 'src/dto/course.dto';
import { Not } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @Inject('CourseRepositoryInterface')
    private readonly courseRepository: CourseRepositoryInterface,
  ) {}

  async getCourses() {
    return await this.courseRepository.findAll();
  }

  async getCourse(id: number) {
    return await this.courseRepository.findOneById(id);
  }

  async createCourse(courseData: CourseDTO) {
    try {
      const courseExistsByCode = await this.courseRepository.findOneBy({
        code: courseData.code,
      });

      if (courseExistsByCode)
        throw new BadRequestException('El código proporcionado ya existe');

      const courseEntity = new CourseEntity(courseData);

      return await this.courseRepository.save(courseEntity);
    } catch (e: any) {
      if (e.statusCode === '400') throw e;

      return e;
    }
  }

  async updateCourse(id: number, courseData: CourseDTO) {
    try {
      const course = await this.courseRepository.findOneById(id);

      if (!course) throw new BadRequestException('El curso no existe');

      const courseExistsByCode = await this.courseRepository.findOneBy({
        id: Not(id),
        code: courseData.code,
      });

      if (courseExistsByCode)
        throw new BadRequestException('El código proporcionado ya existe');

      return await this.courseRepository.update(id, courseData);
    } catch (e: any) {
      if (e.statusCode === '400') throw e;

      return e;
    }
  }

  async deleteCourse(id: number) {
    try {
      const course = await this.courseRepository.findOneById(id);

      if (!course) throw new BadRequestException('El curso no existe');

      return await this.courseRepository.remove(course);
    } catch (e: any) {
      if (e.statusCode === '400') throw e;

      return e;
    }
  }
}
