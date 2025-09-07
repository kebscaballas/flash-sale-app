import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from 'src/entities/application_entity';
import type {
  DataSource,
  DeepPartial,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export abstract class ApplicationRepository<T extends ApplicationEntity> {
  private readonly entity: EntityTarget<ApplicationEntity>;
  private readonly dataSource: DataSource;

  constructor(entity: EntityTarget<ApplicationEntity>, dataSource: DataSource) {
    this.entity = entity;
    this.dataSource = dataSource;
  }

  private getEntityManager(entityManager?: EntityManager): EntityManager {
    return entityManager ?? this.dataSource.manager;
  }

  private getRepository<T extends ObjectLiteral>(
    entityTarget: EntityTarget<T>,
    entityManager?: EntityManager,
  ): Repository<T> {
    return this.getEntityManager(entityManager).getRepository(entityTarget);
  }

  protected persistence(entityManager?: EntityManager) {
    return this.getRepository(this.entity, entityManager);
  }

  async create(
    data: DeepPartial<T>[],
    entityManager?: EntityManager,
  ): Promise<ApplicationEntity[]>;
  async create(
    data: DeepPartial<T>,
    entityManager?: EntityManager,
  ): Promise<ApplicationEntity>;
  async create(
    data: DeepPartial<ApplicationEntity> | DeepPartial<ApplicationEntity>[],
    entityManager?: EntityManager,
  ) {
    if (Array.isArray(data)) {
      return this.persistence(entityManager).save(data);
    } else {
      return this.persistence(entityManager).save(data);
    }
  }
}
