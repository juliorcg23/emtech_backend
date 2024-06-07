import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import CourseDTO from './course.dto';
import { Type } from 'class-transformer';

export default class StudentDTO {
  @IsNotEmpty({
    message: 'El nombre es requerido',
  })
  name: string;

  @IsNotEmpty({
    message: 'El apellido es requerido',
  })
  lastname: string;

  @IsNotEmpty({
    message: 'El número de identificación es requerido',
  })
  @MaxLength(6, {
    message: 'El número de identificación no debe tener más de 7 dígitos',
  })
  id_number: string;

  @IsNotEmpty({
    message: 'El correo electrónico es requerido',
  })
  @IsEmail(
    {},
    {
      message: 'El email no tiene el formato correcto',
    },
  )
  email: string;

  @IsBoolean()
  @IsNotEmpty({
    message: 'Este campo es requerido',
  })
  active: boolean;

  @IsNotEmpty({
    message: 'El curso es requerido',
  })
  @Type(() => CourseDTO)
  course: CourseDTO;

  @IsOptional()
  progress: number;
}
