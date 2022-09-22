/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/server/modules/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
    }));
    await app.init();
  });

  it('POST /users', () => {
    return request(app.getHttpServer())
      .post('127.0.0.1:3000/users')
      .send({
        name:"prueba 15",
        mail:"prueba1@gmail.com",
        dni:"12345678",
        provincia:"CABA",
        ciudad:"CABA",
        direccion:"Juan B Alberdi",
        codigoPostal:"14245", //debería ser 4 numeros
        responsableTributo:"Monotributista",
        personaPolitica:false,
        personaRegulada:true,
        fechaNacimiento:"1999-03-13",
        urlFoto:"flaticon.com/free-icon/wood_1059509?term=wood&page=1&position=5&page=1&position=5&related_id=1059509&origin=search"
      }).expect(400);
  });
});
