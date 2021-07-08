const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

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

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode ? err.statusCode : 500;
  err.status = err.status ? err.status : 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendDevError(err, res);
  }

  sendProdError(err, res);
};
