import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import StudentDTO from 'src/dto/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  async getStudents(
    @Query('active') active: boolean,
    @Query('courseId') courseId: number,
  ) {
    return await this.studentService.getStudents(active, courseId);
  }

  @Get('/:id')
  async getStudent(@Param('id') id: number) {
    return await this.studentService.getStudent(id);
  }

  @Post('/')
  async createStudent(@Body() studentData: StudentDTO) {
    return await this.studentService.createStudent(studentData);
  }

  @Put('/:id')
  async updateStudent(
    @Param('id') id: number,
    @Body() studentData: StudentDTO,
  ) {
    return await this.studentService.updateStudent(id, studentData);
  }

  @Delete('/:id')
  async deleteStudent(@Param('id') id: number) {
    return await this.studentService.deleteStudent(id);
  }
}
