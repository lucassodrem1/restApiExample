const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const db = require('../db/index');

describe('Add /users/login', () => {
  let res;

  it('Verificar requisição válida', async () => {
    res = await request(app)
      .post('/api/v1/users/login')
      .send({ username: 'admin', password: 'admin.123' })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Verificar se jwt é válido', () => {
    const decoded = jwt.verify(res.body.data, process.env.JWT_TOKEN);
    const { id, iat, exp } = decoded;
    expect(decoded).toEqual({ id, iat, exp });
  });

  it('Verificar requisição inválida', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({ username: 'admin', password: 'admin.1234' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});

afterAll(async () => {
  await db.query('DROP TABLE users');
});
