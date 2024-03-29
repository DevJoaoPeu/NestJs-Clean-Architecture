import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectStatus } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    
  }

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: string) {
    return this.projectRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    if (updateProjectDto.cancelled_at) {
      if (project.status === ProjectStatus.Completed) {
        throw new Error('Cannot cancel completed project');
      }
      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot cancel cancelled project');
      }

      if (updateProjectDto.cancelled_at < project.started_at) {
        throw new Error('Cannot cancel project before it started');
      }

      project.cancelled_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Cancelled;
    }

    if (updateProjectDto.finished_at) {
      if (project.status === ProjectStatus.Completed) {
        throw new Error('Cannot finish completed project');
      }
      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot finish cancelled project');
      }

      if (updateProjectDto.finished_at < project.started_at) {
        throw new Error('Cannot finish project before it started');
      }

      project.finished_at = updateProjectDto.finished_at;
      project.status = ProjectStatus.Completed;
    }

    return this.projectRepo.save(project);
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
