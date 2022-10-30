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
import { UserDto } from '../server/dtos/user.dto';
import {
  createInvalidMails,
  createInvalidNumbers,
  createInvalidProducerTypes,
  createInvalidStrings,
  createMockUser,
  createMockUserDto,
  createInvalidPostalCodes,
  createInvalidtaxSubjectType,
  createInvalidBooleans,
  createInvalidDates,
  createInvalidUrls,
  createMockMovement,
} from './test-utils';
import { PoWR } from '../server/entities/powr.entity';
import { Accreditation } from '../server/entities/accreditation.entity';

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
    let server: any;

    beforeEach(async () => {
      mockUserDto = createMockUserDto();
      server = await app.getHttpServer();
    });

    it('should create a valid user', async () => {
      return request(server).post('/users').send(mockUserDto).expect(200);
    });

    it('should return 400 with invalid name', async () => {
      const invalidFields = createInvalidStrings();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.name = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid email', async () => {
      const invalidFields = createInvalidMails();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.mail = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid dni', async () => {
      const invalidFields = createInvalidNumbers();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.dni = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid producer type', async () => {
      const invalidFields = createInvalidProducerTypes();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.producerType = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid provincia', async () => {
      const invalidFields = createInvalidStrings();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.provincia = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid city', async () => {
      const invalidFields = createInvalidStrings();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.city = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid address', async () => {
      const invalidFields = createInvalidStrings();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.address = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid postal code', async () => {
      const invalidFields = createInvalidPostalCodes();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.postalCode = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid tax subject type', async () => {
      const invalidFields = createInvalidtaxSubjectType();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.taxSubjectType = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid isPoliticPerson', async () => {
      const invalidFields = createInvalidBooleans();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.isPoliticPerson = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid isRegulatedPerson', async () => {
      const invalidFields = createInvalidBooleans();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.isRegulatedPerson = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid date of birth', async () => {
      const invalidFields = createInvalidDates();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.dateOfBirth = value;
          return mockUserDto;
        },
        invalidFields,
      );
    });

    it('should return 400 with invalid url', async () => {
      const invalidFields = createInvalidUrls();

      return testInvalidFields(
        server,
        '/users',
        (value: any) => {
          mockUserDto.photoUrl = value;
          return mockUserDto;
        },
        invalidFields,
      );
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
          () => new Promise((resolve) => resolve(createMockMovement())),
        ),
        find: jest.fn(
          () => new Promise((resolve) => resolve([createMockMovement()])),
        ),
        update: jest.fn(
          (id, project2) => new Promise((resolve) => resolve(createMockMovement())),
        ),
        findOne: jest.fn(
          ({ uuid }) =>
            new Promise((resolve) => {
              resolve(createMockMovement());
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
      factory: () => ({}),
    })
    .overrideProvider(getRepositoryToken(PoWR))
    // this is how you give the factory, value, or class to use instead
    .useFactory({
      factory: () => ({}),
    })
    .overrideProvider(getRepositoryToken(Accreditation))
    // this is how you give the factory, value, or class to use instead
    .useFactory({
      factory: () => ({}),
    })
    .compile();
  return moduleFixture;
}

export function testInvalidFields(
  server: any,
  endpoint: string,
  action: (value: any) => UserDto,
  invalidFields: any[],
): Promise<any> {
  let object: UserDto;
  object = action(test);

  const promises = invalidFields.map((value) => {
    object = action(value);
    // assert
    return request(server).post(endpoint).send(object).expect(400);
  });
  return Promise.all(promises);
}