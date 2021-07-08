const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const db = require('../db');

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
