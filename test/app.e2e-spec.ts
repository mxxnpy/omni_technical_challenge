/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

interface UserResponse {
  id: string;
  username: string;
  birthdate: string;
  balance: number;
}

describe('API (e2e)', () => {
  let app: INestApplication;
  let userId1: string;
  let userId2: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users/signup', () => {
    it('should create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({
          username: 'user1',
          password: 'password123',
          birthdate: '1990-01-01',
        })
        .expect(201);

      const body = response.body as UserResponse;
      expect(body).toHaveProperty('id');
      userId1 = body.id;
    });

    it('should create a second user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({
          username: 'user2',
          password: 'password456',
          birthdate: '1995-05-05',
        })
        .expect(201);

      const body = response.body as UserResponse;
      expect(body).toHaveProperty('id');
      userId2 = body.id;
    });

    it('should return 409 for duplicate username', async () => {
      await request(app.getHttpServer())
        .post('/users/signup')
        .send({
          username: 'user1',
          password: 'password123',
          birthdate: '1990-01-01',
        })
        .expect(409);
    });

    it('should return 400 for invalid data', async () => {
      await request(app.getHttpServer())
        .post('/users/signup')
        .send({
          username: '',
          password: '123',
          birthdate: '',
        })
        .expect(400);
    });
  });

  describe('POST /users/signin', () => {
    it('should login successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signin')
        .send({
          username: 'user1',
          password: 'password123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('expiresIn', '1h');
    });

    it('should return 401 for invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/users/signin')
        .send({
          username: 'user1',
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('should return 401 for non-existent user', async () => {
      await request(app.getHttpServer())
        .post('/users/signin')
        .send({
          username: 'nonexistent',
          password: 'password123',
        })
        .expect(401);
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      const users = response.body as UserResponse[];
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThanOrEqual(2);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('username');
      expect(users[0]).toHaveProperty('birthdate');
      expect(users[0]).toHaveProperty('balance');
    });
  });

  describe('POST /transfer', () => {
    it('should transfer money successfully', async () => {
      await request(app.getHttpServer())
        .post('/transfer')
        .send({
          fromId: userId1,
          toId: userId2,
          amount: 100,
        })
        .expect(204);
    });

    it('should return 400 for insufficient balance', async () => {
      await request(app.getHttpServer())
        .post('/transfer')
        .send({
          fromId: userId1,
          toId: userId2,
          amount: 999999,
        })
        .expect(400);
    });

    it('should return 400 for transfer to yourself', async () => {
      await request(app.getHttpServer())
        .post('/transfer')
        .send({
          fromId: userId1,
          toId: userId1,
          amount: 100,
        })
        .expect(400);
    });

    it('should return 404 for non-existent sender', async () => {
      await request(app.getHttpServer())
        .post('/transfer')
        .send({
          fromId: '00000000-0000-0000-0000-000000000000',
          toId: userId2,
          amount: 100,
        })
        .expect(404);
    });

    it('should return 400 for negative amount', async () => {
      await request(app.getHttpServer())
        .post('/transfer')
        .send({
          fromId: userId1,
          toId: userId2,
          amount: -100,
        })
        .expect(400);
    });
  });
});
