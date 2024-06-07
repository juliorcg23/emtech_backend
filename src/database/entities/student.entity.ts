import StudentDTO from 'src/dto/student.dto';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import CourseEntity from './course.entity';

@Entity('students')
export default class StudentEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  id_number!: string;

  @Column()
  email!: string;

  @Column()
  active!: boolean;

  @Column()
  progress!: number;

  constructor(studentDTO: StudentDTO) {
    super();
    this.name = studentDTO?.name;
    this.lastname = studentDTO?.lastname;
    this.id_number = studentDTO?.id_number;
    this.email = studentDTO?.email;
    this.active = studentDTO?.active;
    this.progress = studentDTO?.progress;

    this.course = new CourseEntity(studentDTO?.course);
  }

  @ManyToOne(() => CourseEntity, (course) => course.students)
  @JoinColumn({
    name: 'course_id',
    referencedColumnName: 'id',
  })
  course!: CourseEntity;
}
