import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import CourseSeeder from 'src/database/seeds/courses.seeder';
import CourseEntity from 'src/database/entities/course.entity';
import StudentEntity from 'src/database/entities/student.entity';

dotenv.config({
  path: './.env',
});

const dataSource: DataSource = new DataSource({
  type: 'mysql',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  migrations: ['**/migrations/*.js'],
  entities: [CourseEntity, StudentEntity],
  logging: true,
  seeds: [CourseSeeder],
} as DataSourceOptions & SeederOptions);

dataSource
  .initialize()
  .then(() => console.log('MySQL DataSource Initialized'))
  .catch((e) => console.log('Could not initialize MySQL DataSource', e));

export default dataSource;
