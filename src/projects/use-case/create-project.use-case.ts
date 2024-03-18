import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProjectUseCase {
  constructor(private readonly projectRepo: Repository<Project>) {}

  execute(input: CreateProjectDto) {
    const project = new Project(input);
    if (input.started_at) {
      project.status = ProjectStatus.Active;
    }

    return this.projectRepo.save(project);
  }
}
