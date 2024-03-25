import { InjectRepository } from '@nestjs/typeorm';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { StartProjectDto } from '../dto/start-project.dto';

export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    project.start(input.started_at);

    return this.projectRepo.save(project);
  }
}
