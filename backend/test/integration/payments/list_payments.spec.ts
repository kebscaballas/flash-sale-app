// test/list_payments.spec.ts
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

describe('GET /payments', () => {
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

  it('returns a 400 error with query validations', async () => {
    const response = await request(app.getHttpServer())
      .get('/payments')
      .query({ email: 'not-an-email' })
      .expect(400);

    expect(response.body?.errors?.[0]).toMatchObject({
      statusCode: 400,
      parameter: 'email',
      detail: 'E-mail has an invalid format.',
    });
  });

  it('returns an empty array when no records found', async () => {
    const response = await request(app.getHttpServer())
      .get('/payments')
      .query({ email: 'empty@example.com' })
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('returns an array with required shape and types', async () => {
    const currentDateIsoString = new Date().toISOString();

    await dataSource.query(
      `INSERT INTO payments (id, created_at, amount, email, product_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [1, currentDateIsoString, '7107.15', 'customer@example.com', 1],
    );
    await dataSource.query(
      `INSERT INTO payments (id, created_at, amount, email, product_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [2, currentDateIsoString, '7107.15', 'customer2@example.com', 1],
    );
    await dataSource.query(
      `INSERT INTO payments (id, created_at, amount, email, product_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [3, currentDateIsoString, '7107.15', 'customer3@example.com', 1],
    );

    const response = await request(app.getHttpServer())
      .get('/payments')
      .query({ email: 'customer@example.com' })
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);

    for (const item of response.body) {
      expect(Object.keys(item).sort()).toEqual(
        ['id', 'created_at', 'amount', 'email', 'product_id'].sort(),
      );
      expect(typeof item.id).toBe('number');
      expect(isISODate(item.created_at)).toBe(true);
      expect(typeof item.amount).toBe('string');
      expect(typeof item.email).toBe('string');
      expect(typeof item.product_id).toBe('number');
      expect(item.email).toBe('customer@example.com');
    }
  });
});
