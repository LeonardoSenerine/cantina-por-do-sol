import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { setupApp } from './../src/setup.js';
import { addDays, nowIn, weekdayOf } from './../src/common/dates.js';

// definida em vitest.config.e2e.ts, junto com o banco em memória
const ADMIN_KEY = 'chave-de-teste-com-mais-de-16';

// próxima sexta a partir de amanhã, para a reserva nunca cair no passado
const nextFriday = () => {
  let d = addDays(nowIn('America/Sao_Paulo').date, 1);
  while (weekdayOf(d) !== 5) d = addDays(d, 1);
  return d;
};

describe('API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /api/health', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
      });
  });

  it('GET /api/experiences', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/experiences')
      .expect(200);
    expect(res.body.map((e: { id: string }) => e.id)).toEqual([
      'cafe',
      'pizza',
    ]);
  });

  it('cria, lista e confirma uma reserva', async () => {
    const server = app.getHttpServer();
    const date = nextFriday();

    const created = await request(server)
      .post('/api/reservations')
      .send({
        experience: 'pizza',
        date,
        time: '20:00',
        adults: 4,
        name: '  João  ',
        phone: '(49) 99999-0000',
      })
      .expect(201);
    expect(created.body.reservation).toMatchObject({
      experience: 'pizza',
      date,
      adults: 4,
      kids69: 0,
      name: 'João',
      phone: '49999990000',
      status: 'pending',
    });
    expect(created.body.whatsappUrl).toMatch(/^https:\/\/wa\.me\//);
    const id = created.body.reservation.id;

    await request(server).get('/api/reservations').expect(401);
    await request(server)
      .get('/api/reservations')
      .set('x-admin-key', 'errada')
      .expect(401);

    const list = await request(server)
      .get('/api/reservations')
      .query({ from: date })
      .set('x-admin-key', ADMIN_KEY);
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);

    const confirmed = await request(server)
      .patch(`/api/reservations/${id}/status`)
      .set('x-admin-key', ADMIN_KEY)
      .send({ status: 'confirmed' })
      .expect(200);
    expect(confirmed.body.status).toBe('confirmed');
  });

  it('valida o corpo da reserva', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/reservations')
      .send({
        experience: 'churrasco',
        date: 'amanhã',
        time: '20h',
        adults: 0,
        name: 'X',
        extra: 1,
      })
      .expect(400);
    expect(Array.isArray(res.body.message)).toBe(true);
  });
});
