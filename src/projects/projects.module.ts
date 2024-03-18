import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsControllerWithUseCase } from './projects.controller-with-use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectUseCase } from './use-case/create-project.use-case';
import { FindALlProjectsUseCase } from './use-case/find-all-projects-use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsControllerWithUseCase],
  providers: [ProjectsService, CreateProjectUseCase, FindALlProjectsUseCase],
})
export class ProjectsModule {}
