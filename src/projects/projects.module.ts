import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsControllerWithUseCase } from './projects.controller-with-use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectUseCase } from './use-case/create-project.use-case';
import { FindALlProjectsUseCase } from './use-case/find-all-projects-use-case';
import { StartProjectUseCase } from './use-case/start-project-use-case';
import { ProjectTypeOrmRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsControllerWithUseCase],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindALlProjectsUseCase,
    StartProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository,
    },
  ],
})
export class ProjectsModule {}
