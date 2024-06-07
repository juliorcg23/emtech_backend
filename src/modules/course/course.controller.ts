import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import CourseDTO from 'src/dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  async getCourses() {
    return await this.courseService.getCourses();
  }

  @Get('/:id')
  async getCourse(@Param('id') id: number) {
    return await this.courseService.getCourse(id);
  }

  @Post('/')
  async createCourse(@Body() courseData: CourseDTO) {
    return await this.courseService.createCourse(courseData);
  }

  @Put('/:id')
  async updateCourse(@Param('id') id: number, @Body() courseData: CourseDTO) {
    return await this.courseService.updateCourse(id, courseData);
  }

  @Delete('/:id')
  async deleteCourse(@Param('id') id: number) {
    return await this.courseService.deleteCourse(id);
  }
}
