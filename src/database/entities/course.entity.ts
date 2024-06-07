import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import CourseDTO from 'src/dto/course.dto';
import StudentEntity from './student.entity';

@Entity('courses')
export default class CourseEntity extends BaseEntity {
  @Column()
  code!: string;

  @Column()
  name!: string;

  constructor(courseData: CourseDTO) {
    super();
    this.id = courseData?.id;
    this.code = courseData?.code;
    this.name = courseData?.name;
  }

  @OneToMany(() => StudentEntity, (student) => student.course)
  students: StudentEntity[];
}
