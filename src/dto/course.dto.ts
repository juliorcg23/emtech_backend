import { IsNotEmpty, IsOptional } from 'class-validator';

export default class CourseDTO {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  progress?: number;
}
