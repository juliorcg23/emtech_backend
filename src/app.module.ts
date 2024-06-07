import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeys } from './config/config.keys';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get(ConfigKeys.DB_HOST),
        port: Number(config.get(ConfigKeys.DB_PORT)),
        database: config.get(ConfigKeys.DB_NAME),
        username: config.get(ConfigKeys.DB_USER),
        password: config.get(ConfigKeys.DB_PASSWORD),
        autoLoadEntities: true,
        //migrations: './database/migrations/*',
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  static version: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(ConfigKeys.PORT);
    AppModule.version = this.configService.get(ConfigKeys.VERSION);
  }
}
