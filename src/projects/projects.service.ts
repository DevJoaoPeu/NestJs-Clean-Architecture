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
    const project = new Project(createProjectDto);
    if (createProjectDto.started_at) {
      project.status = ProjectStatus.Active;
    }

    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: string) {
    return this.projectRepo.findOneOrFail({ where: { id } });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
