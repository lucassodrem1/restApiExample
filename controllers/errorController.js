const AppError = require('../utils/AppError');

/**
 * Retornar mensagem de erro no ambiente
 * de desenvolvimento.
 * @param {import('express').Errback} err
 * @param {import('express').Response} res
 */
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

/**
 * Adaptar mensagem de erro para o ambiente
 * de produção. Caso não seja um erro
 * operacional, dar erro 500.
 *
 * @param {import('express').Errback} err
 * @param {import('express').Response} res
 * @returns
 */
const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: 'Opa! Alguma coisa errada aconteceu... :(',
  });
};

/**
 * Tratar erro do postgre em relação à parâmetro
 * inválido.
 * @param {import('express').Errback} err
 * @returns {AppError}
 */
const handleInvalidInputDB = err => {
  const field = err.message.split(':')[1];
  return new AppError(`Parâmetro não inserido ou inválido: ${field}`, 400);
};

/**
 * Tratar erro de valores duplicados
 * no banco de dados.
 * @param {import('express').Errback} err
 * @returns {AppError}
 */
const handleDuplicateFieldsDB = err => {
  const regex = /\(([^)]+)\)/;
  const matches = err.detail.match(regex);

  let errorMessage = `${matches[1]} já existe! Por favor use outro valor`;

  // Verificar se o campo duplicado é slug e gerar uma resposta adequado ao usuário.
  if (matches[1] === 'slug')
    errorMessage = `Slug gerado a partir do título já existe. Por favor, use outro título.`;

  return new AppError(errorMessage, 400);
};

/**
 * Middleware para exebir erros
 * dependendo do ambiente que a
 * aplicação esteja rodando.
 * @param {import('express').Errback} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {JSON} Mensagem de erro.
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode ? err.statusCode : 500;
  err.status = err.status ? err.status : 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendDevError(err, res);
  }

  let error = Object.assign(err);
  if (error.code === '22P02') error = handleInvalidInputDB(err);
  if (error.code === '23505') error = handleDuplicateFieldsDB(error);
  sendProdError(error, res);
};
