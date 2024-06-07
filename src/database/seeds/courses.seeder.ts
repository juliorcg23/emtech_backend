import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import CourseEntity from '../entities/course.entity';

export default class CourseSeeder implements Seeder {
  track?: boolean;
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CourseEntity);

    const courses = [
      new CourseEntity({
        code: '738586',
        name: 'Curso 1',
      }),
      new CourseEntity({
        code: '523882',
        name: 'Curso 2',
      }),
      new CourseEntity({
        code: '123239',
        name: 'Curso 3',
      }),
    ];

    await Promise.all(
      courses.map(async (course: CourseEntity) => {
        await repository.save(course);
      }),
    );
  }
}
