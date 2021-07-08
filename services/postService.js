const slugify = require('slugify');
const AppError = require('../utils/AppError');
const db = require('../db');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).filter(key => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

exports.getPosts = async req => {
  const { rows: posts } = await db.query(
    `SELECT posts.id, posts.title, posts.content, posts.slug, users.username AS created_by 
    FROM posts INNER JOIN users ON users.id = posts.created_by`
  );

  return posts;
};

exports.addPost = async req => {
  const { title, content } = req.body;

  // 1. Verificar se contém título e conteúdo.
  if (!title || !content)
    throw new AppError('O post deve possuir título e conteúdo.', 400);

  // 2. Gerar slugify.
  const slug = slugify(title, {
    replacement: '-',
    lower: true,
    strict: true,
  });

  // 3. Persistir no banco.
  await db.query(
    'INSERT INTO posts (title, content, slug, created_by) VALUES ($1, $2, $3, $4)',
    [title, content, slug, req.user.id]
  );
};

exports.getPostBySlug = async req => {
  const { slug } = req.params;

  if (!slug) throw new AppError('Slug não especificado.', 400);

  const {
    rows: [post],
  } = await db.query(
    `SELECT title, content, slug, users.username AS created_by
    FROM posts INNER JOIN users ON users.id = posts.created_by 
    WHERE slug = $1`,
    [slug]
  );

  if (!post) throw new AppError('Post não encontrado.', 404);

  return post;
};

exports.updatePostById = async req => {
  const fields = [];
  const values = [req.params.id];

  // 1. Filtrar campos permitidos para atualizar.
  const filteredObj = filterObj(req.body, 'title', 'content');

  // 2. Formatar valores para usar como query.
  Object.entries(filteredObj).forEach(([key, value], i) => {
    fields.push(`${key} = $${i + 2}`);
    values.push(value);
  });

  // 3. Se mudar title, gerar um novo slugify.
  if (filteredObj.title) {
    const slug = slugify(filteredObj.title, {
      replacement: '-',
      lower: true,
      strict: true,
    });

    fields.push(`slug = $${fields.length + 2}`);
    values.push(slug);
  }

  const { rowCount } = await db.query(
    `UPDATE posts SET ${fields} WHERE id = $1`,
    values
  );

  // 4. Validar se o post existe.
  if (!rowCount) throw new AppError('Post não encontrado.', 404);
};

exports.deletePostById = async req => {
  const { id } = req.params;

  const { rowCount } = await db.query('DELETE FROM posts WHERE id = $1', [id]);

  if (!rowCount) throw new AppError('Post não encontrado.', 404);
};
