// test/get_nearest_flash_sale.spec.ts
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApplicationModule } from '../../../src/modules/application_module';
import { DataSource } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import request from 'supertest';

describe('GET /flash_sales/nearest', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const applicationModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = applicationModule.createNestApplication();

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        stopAtFirstError: true,
        validationError: { target: false, value: false },
        exceptionFactory: (errors: ValidationError[]) =>
          new BadRequestException({
            errors: errors.map((e) => ({
              statusCode: 400,
              parameter: e.property,
              detail: Object.values(e.constraints!)[0],
            })),
          }),
      }),
    );
    await app.init();

    dataSource = app.get(DataSource);
  });

  beforeEach(async () => {
    const runner = dataSource.createQueryRunner();
    await runner.connect();
    try {
      const rows: Array<{ schema: string; name: string }> = await runner.query(`
        SELECT quote_ident(schemaname) AS schema,
              quote_ident(tablename) AS name
        FROM pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
          AND tablename NOT LIKE 'pg_%'
      `);

      if (rows.length) {
        const qualified = rows.map((r) => `${r.schema}.${r.name}`).join(', ');
        await runner.query(
          `TRUNCATE TABLE ${qualified} RESTART IDENTITY CASCADE`,
        );
      }
    } finally {
      await runner.release();
    }
  });

  afterAll(async () => {
    await app.close();
  });

  const isISODate = (v: unknown) =>
    typeof v === 'string' && !Number.isNaN(Date.parse(v));

  it('returns a 404 error when no records are found', async () => {
    const response = await request(app.getHttpServer())
      .get('/flash_sales/nearest')
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      detail: 'No flash sales found.',
    });
  });

  it('returns an object with active status', async () => {
    const currentDate = new Date();
    const currentDateIsoString = currentDate.toISOString();

    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDateIsoString = tomorrowDate.toISOString();

    await dataSource.query(
      `INSERT INTO flash_sales (id, started_at, ended_at, created_at)
       VALUES ($1, $2, $3, $4)`,
      [1, currentDateIsoString, tomorrowDateIsoString, currentDateIsoString],
    );

    const response = await request(app.getHttpServer())
      .get('/flash_sales/nearest')
      .expect(200);

    expect(typeof response.body).toBe('object');
    expect(response.body).not.toBeNull();

    expect(Object.keys(response.body).sort()).toEqual(
      ['id', 'created_at', 'started_at', 'ended_at', 'status'].sort(),
    );
    expect(typeof response.body.id).toBe('number');
    expect(isISODate(response.body.started_at)).toBe(true);
    expect(isISODate(response.body.ended_at)).toBe(true);
    expect(isISODate(response.body.created_at)).toBe(true);
    expect(response.body.status).toBe('active');
  });

  it('returns an object with active status', async () => {
    const currentDate = new Date();
    const currentDateIsoString = currentDate.toISOString();

    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDateIsoString = tomorrowDate.toISOString();

    await dataSource.query(
      `INSERT INTO flash_sales (id, started_at, ended_at, created_at)
       VALUES ($1, $2, $3, $4)`,
      [1, currentDateIsoString, tomorrowDateIsoString, currentDateIsoString],
    );

    const response = await request(app.getHttpServer())
      .get('/flash_sales/nearest')
      .expect(200);

    expect(typeof response.body).toBe('object');
    expect(response.body).not.toBeNull();

    expect(Object.keys(response.body).sort()).toEqual(
      ['id', 'created_at', 'started_at', 'ended_at', 'status'].sort(),
    );
    expect(typeof response.body.id).toBe('number');
    expect(isISODate(response.body.started_at)).toBe(true);
    expect(isISODate(response.body.ended_at)).toBe(true);
    expect(isISODate(response.body.created_at)).toBe(true);
    expect(response.body.status).toBe('active');
  });

  it('returns an object with ended status', async () => {
    const startedAtDate = new Date();
    startedAtDate.setDate(startedAtDate.getDate() - 4);
    const startedAtDateIsoString = startedAtDate.toISOString();

    const endedAtDate = new Date();
    endedAtDate.setDate(startedAtDate.getDate() + 1);
    const endedAtDateIsoString = endedAtDate.toISOString();

    await dataSource.query(
      `INSERT INTO flash_sales (id, started_at, ended_at, created_at)
       VALUES ($1, $2, $3, $4)`,
      [1, startedAtDateIsoString, endedAtDateIsoString, startedAtDateIsoString],
    );

    const response = await request(app.getHttpServer())
      .get('/flash_sales/nearest')
      .expect(200);

    expect(typeof response.body).toBe('object');
    expect(response.body).not.toBeNull();

    expect(Object.keys(response.body).sort()).toEqual(
      ['id', 'created_at', 'started_at', 'ended_at', 'status'].sort(),
    );
    expect(typeof response.body.id).toBe('number');
    expect(isISODate(response.body.started_at)).toBe(true);
    expect(isISODate(response.body.ended_at)).toBe(true);
    expect(isISODate(response.body.created_at)).toBe(true);
    expect(response.body.status).toBe('ended');
  });
});
