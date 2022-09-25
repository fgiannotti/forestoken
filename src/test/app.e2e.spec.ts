/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../server/modules/app.module';
import { TokensModule } from '../server/modules/tokens.module';
import { UsersModule } from '../server/modules/users.module';
import { AppController } from '../server/controllers/app.controller';
import { AppService } from '../server/services/app.service';
import { GoogleStrategy } from '../server/strategies/google.strategy';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../shared/constants/env';
import { Movement } from '../server/entities/movement.entity';
import { Wallet } from '../server/entities/wallet.entity';
import { User } from '../server/entities/user.entity';
import { createMockUser } from './test-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(10000);
  beforeAll(async () => {
    const moduleFixture = await createTestModuleWithMockDB();
    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: false,
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          let errs = '';
          validationErrors.forEach((err) => {
            errs += JSON.stringify(err.constraints);
          });
          console.log('errores juntitos', errs);
          return new BadRequestException(errs);
        },
      }),
    );
    await app.init();
  });

  it('POST /users', async () => {
    const server = await app.getHttpServer();
    return request(server)
      .post('/users')
      .send({
        name: 'prueba 15',
        mail: 'prueba1@gmail.com',
        dni: '12345678',
        provincia: 'CABA',
        ciudad: 'CABA',
        direccion: 'Juan B Alberdi',
        codigoPostal: '14245', //debería ser 4 numeros
        responsableTributo: 'Monotributista',
        personaPolitica: false,
        personaRegulada: true,
        fechaNacimiento: '1999-03-13',
        urlFoto:
          'flaticon.com/free-icon/wood_1059509?term=wood&page=1&position=5&page=1&position=5&related_id=1059509&origin=search',
      })
      .expect(400)
      .then((res) => {
        console.log(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

async function createTestModuleWithMockDB() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    controllers: [AppController],
    imports: [AppModule, TokensModule, UsersModule],
    providers: [AppService, GoogleStrategy],
  })
    .overrideProvider(getRepositoryToken(User))
    // this is how you give the factory, value, or class to use instead
    .useFactory({
      factory: () => ({
        create: jest.fn(
          () => new Promise((resolve) => resolve(createMockUser())),
        ),
        find: jest.fn(
          () => new Promise((resolve) => resolve([createMockUser()])),
        ),
        update: jest.fn(
          (id, project2) => new Promise((resolve) => resolve(createMockUser())),
        ),
        findOne: jest.fn(
          ({ uuid }) =>
            new Promise((resolve) => {
              resolve(createMockUser());
            }),
        ),
        delete: jest.fn(),
        save: jest.fn(
          (data) =>
            new Promise((resolve) => {
              // data = data.uuid === undefined ? data.uuid = uuid() : data;
              resolve(data);
            }),
        ),
      }),
    })
    .overrideProvider(getRepositoryToken(Movement))
    .useFactory({
      factory: () => ({
        create: jest.fn(
          () => new Promise((resolve) => resolve(createMockUser())),
        ),
        find: jest.fn(
          () => new Promise((resolve) => resolve([createMockUser()])),
        ),
        update: jest.fn(
          (id, project2) => new Promise((resolve) => resolve(createMockUser())),
        ),
        findOne: jest.fn(
          ({ uuid }) =>
            new Promise((resolve) => {
              resolve(createMockUser());
            }),
        ),
        delete: jest.fn(),
        save: jest.fn(
          (data) =>
            new Promise((resolve) => {
              // data = data.uuid === undefined ? data.uuid = uuid() : data;
              resolve(data);
            }),
        ),
      }),
    })
    .overrideProvider(getRepositoryToken(Wallet))
    .useFactory({
      factory: () => ({
        create: jest.fn(
          () => new Promise((resolve) => resolve(createMockUser())),
        ),
        find: jest.fn(
          () => new Promise((resolve) => resolve([createMockUser()])),
        ),
        update: jest.fn(
          (id, project2) => new Promise((resolve) => resolve(createMockUser())),
        ),
        findOne: jest.fn(
          ({ uuid }) =>
            new Promise((resolve) => {
              resolve(createMockUser());
            }),
        ),
        delete: jest.fn(),
        save: jest.fn(
          (data) =>
            new Promise((resolve) => {
              // data = data.uuid === undefined ? data.uuid = uuid() : data;
              resolve(data);
            }),
        ),
      }),
    })
    .compile();
  return moduleFixture;
}
