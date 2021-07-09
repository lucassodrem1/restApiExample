const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const request = require('supertest');
const app = require('../app');
const db = require('../db/index');

describe('GET /posts', () => {
  let res;

  it('Fazer uma busca válida por todos os posts', async () => {
    res = await request(app)
      .get('/api/v1/posts/')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Verificar se resposta é o formato correto', () =>
    expect(Array.isArray(res.body.data)).toBeTruthy());
});

describe('POST /posts', () => {
  let res;
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1ODAzODI2LCJleHAiOjE2MjgzOTU4MjZ9.oLTRBTuhQucH-pyE0PFgCLRWNYgJ2I7SyPbno5T0jm4';

  it('Adicionar um post', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .set('Cookie', `jwt=${jwt};`)
      .send({ title: 'Post teste', content: 'Conteúdo do post teste' })
      .expect('Content-Type', /json/);

    expect(res.status === 201).toBeTruthy();
  });

  it('Adicionar um post com um slug já existente', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .set('Cookie', `jwt=${jwt};`)
      .send({ title: 'Post teste', content: 'Conteúdo do post teste' })
      .expect('Content-Type', /json/);

    expect(res.status === 400).toBeTruthy();
  });
});

describe('GET /posts/:slug', () => {
  let res;

  it('Buscar um post válido', async () => {
    res = await request(app)
      .get('/api/v1/posts/tudo-sobre-rest-api-utilizando-nodejs')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Verificar se resposta é o formato correto', () => {
    const { id, title, content, slug, created_by } = res.body.data;
    expect(res.body.data).toEqual({ id, title, content, slug, created_by });
  });

  it('Tentar encontrar um post com slug inexistente', async () => {
    res = await request(app)
      .get('/api/v1/posts/aaa')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});

describe('PATCH /posts/:id', () => {
  let res;
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1ODAzODI2LCJleHAiOjE2MjgzOTU4MjZ9.oLTRBTuhQucH-pyE0PFgCLRWNYgJ2I7SyPbno5T0jm4';

  it('Editar post', async () => {
    const res = await request(app)
      .patch('/api/v1/posts/3')
      .set('Cookie', `jwt=${jwt};`)
      .send({ title: 'Post editado', content: 'Conteúdo do post editado' })
      .expect('Content-Type', /json/);

    expect(res.status === 200).toBeTruthy();
  });

  it('Editar post não existente', async () => {
    const res = await request(app)
      .patch('/api/v1/posts/7')
      .set('Cookie', `jwt=${jwt};`)
      .send({ title: 'Post editado', content: 'Conteúdo do post editado' })
      .expect('Content-Type', /json/);

    expect(res.status === 404).toBeTruthy();
  });
});

describe('DELETE /posts/:id', () => {
  let res;
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1ODAzODI2LCJleHAiOjE2MjgzOTU4MjZ9.oLTRBTuhQucH-pyE0PFgCLRWNYgJ2I7SyPbno5T0jm4';

  it('Deletar post', async () => {
    const res = await request(app)
      .delete('/api/v1/posts/1')
      .set('Cookie', `jwt=${jwt};`);

    expect(res.status === 204).toBeTruthy();
  });

  it('Deletar post não existente', async () => {
    const res = await request(app)
      .delete('/api/v1/posts/1')
      .set('Cookie', `jwt=${jwt};`);

    expect(res.status === 404).toBeTruthy();
  });
});

afterAll(async () => {
  await db.query('DROP TABLE posts');
  await db.query('DROP TABLE pgmigrations');
});
