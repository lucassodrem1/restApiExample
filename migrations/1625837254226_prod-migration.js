/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(12)', notNull: true },
    password_hash: {
      type: 'text',
      notNull: true,
    },
  });
  pgm.createTable('posts', {
    id: 'id',
    title: {
      type: 'text',
      notNull: true,
    },
    content: { type: 'text', notNull: true },
    slug: { type: 'text', notNull: true },
    created_by: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
  });
  pgm.addConstraint('users', 'unique_username', { unique: 'username' });
  pgm.addConstraint('posts', 'unique_slug', { unique: 'slug' });
  pgm.createIndex('posts', 'created_by');
  pgm.sql(
    `INSERT INTO users
    (username, password_hash) VALUES
    ('admin', '$2b$12$7ccw2UG5nsJiE32hNuYr/.iexzy6jlLdRN141K6/W1rWG7o9F55uG')`
  );
  pgm.sql(
    `INSERT INTO posts
    (title, content, slug, created_by) VALUES
    ('Tudo sobre Rest API utilizando Node.js.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'tudo-sobre-rest-api-utilizando-nodejs', 1)`
  );
  pgm.sql(
    `INSERT INTO posts
    (title, content, slug, created_by) VALUES
    ('Apenas um título de teste.', 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.', 'apenas-um-titulo-de-teste', 1)`
  );
  pgm.sql(
    `INSERT INTO posts
    (title, content, slug, created_by) VALUES
    ('O mais novo título.', 'It has survived not only five centuries, but also the leap into electronic typesetting.', 'o-mais-novo-titulo', 1)`
  );
};

exports.down = pgm => {};
