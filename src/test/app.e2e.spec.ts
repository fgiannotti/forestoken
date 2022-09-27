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
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movement } from '../server/entities/movement.entity';
import { Wallet } from '../server/entities/wallet.entity';
import { User } from '../server/entities/user.entity';
import { createMockUser, createMockUserDto } from './test-utils';
import { UserDto } from '../server/dtos/user.dto';

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

  describe('POST /users', () => {
    let mockUserDto: UserDto;
    let server : any;
  
    beforeEach(async () => {
      mockUserDto = createMockUserDto();
      server = await app.getHttpServer();
    });

    it('should create a valid user', async () => {
      return request(server)
        .post('/users')
        .send(mockUserDto)
        .expect(200);
    });


    it('should fail with invalid email', async () => {
      mockUserDto.mail = 'invalidEmail';
      const invalidFields = ['invalid', 'invalid@', 'invalid@invalid'];
      testInvalidFields((value: any) => { mockUserDto.mail = value; return mockUserDto; }, invalidFields);
      return request(server)
        .post('/users')
        .send(mockUserDto)
        .expect(400);
    });

    it('should fail with invalid postal code', async () => {
      mockUserDto.postalCode = 'invalidPostalCode';
      return request(server)
        .post('/users')
        .send(mockUserDto)
        .expect(400);
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

export function testInvalidFields(action : (value: any) => UserDto, invalidFields:any[]) {
  let object : UserDto;

  invalidFields.map((value) => {
    object = action.apply(value);
    // assert
  });
}