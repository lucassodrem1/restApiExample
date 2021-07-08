const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

  // Verificar se existe username e password.

  const {
    rows: [user],
  } = await db.query('SELECT id, password FROM users WHERE username = $1', [
    username,
  ]);

  // Verificar se achou user.
  // console.log(await bcrypt.compare(password, user.password));

  return createSendToken(user.id, res);
};
