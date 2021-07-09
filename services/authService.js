const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const db = require('../db');

/**
 * Gerar JWT e gravar no cookie do cliente.
 * @param {Number} userId ID do usuário.
 * @param {import('express').Response} res
 * @returns {String} JWT gerado.
 */
const createSendToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };

  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  return token;
};

/**
 * Autenticar usuário.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @throws {AppError} 400 Campos necessários não passados.
 * @throws {AppError} 401 Usuário ou senha incorreta.
 * @returns {String} JWT gerado para este usuário.
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new AppError('Usuário e senha são obrigatórios.', 400);

  const {
    rows: [user],
  } = await db.query(
    'SELECT id, password_hash FROM users WHERE username = $1',
    [username]
  );

  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    throw new AppError('Usuário ou senha incorreta.', 401);

  return createSendToken(user.id, res);
};

/**
 * Middleware para verificar se o usuário está
 * autenticado no momento.
 * @param {import('express').Request} req
 * @throws {AppError} 401 Usuário não logado.
 * @throws {AppError} 401 Usuário não mais existente.
 * @returns {Object} Dados do usuário autenticado.
 */
exports.protect = async req => {
  let token;

  // 1. Verificar se jwt existe.
  if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    throw new AppError(
      'Você não está logado. Por favor, faça o login para prosseguir.',
      401
    );

  token = req.cookies.jwt;

  // 2. Verificar se jwt é válido.
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);

  // 3. Verificar se usuário existe.
  const {
    rows: [user],
  } = await db.query('SELECT id FROM users WHERE id = $1', [decoded.id]);

  if (!user)
    throw new AppError(
      'O usuário que pertencia a este token não existe mais.',
      401
    );

  return user;
};
