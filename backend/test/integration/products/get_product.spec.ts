// test/get_product.spec.ts
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApplicationModule } from '../../../src/modules/application_module';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import request from 'supertest';
import path from 'path';

describe('GET /products', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.PRODUCT_YAML_PATH = path.resolve(__dirname, 'product.yml');

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns an object with active status', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(typeof response.body).toBe('object');
    expect(response.body).not.toBeNull();

    expect(Object.keys(response.body).sort()).toEqual(
      ['id', 'name', 'amount', 'image_url', 'stock'].sort(),
    );
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Labubu (Secret Rare)');
    expect(response.body.amount).toBe('7107.15');
    expect(response.body.image_url).toBe('/assets/labubu.webp');
    expect(response.body.stock).toBe(10000);
  });
});
