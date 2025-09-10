import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from '../entities/application_entity';
import type {
  DataSource,
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export abstract class ApplicationRepository<T extends ApplicationEntity> {
  private readonly entity: EntityTarget<T>;
  private readonly dataSource: DataSource;

  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
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

  async query(query: DeepPartial<T>, entityManager?: EntityManager) {
    return this.persistence(entityManager).find({
      where: query as FindOptionsWhere<T>,
    });
  }

  async create(
    data: DeepPartial<T>[],
    entityManager?: EntityManager,
  ): Promise<T[]>;
  async create(data: DeepPartial<T>, entityManager?: EntityManager): Promise<T>;
  async create(
    data: DeepPartial<T> | DeepPartial<T>[],
    entityManager?: EntityManager,
  ) {
    const persistence = this.persistence(entityManager);
    if (Array.isArray(data)) {
      const entities = persistence.create(data);

      return persistence.save(entities);
    } else {
      const entity = persistence.create(data);

      return persistence.save(entity);
    }
  }
}
