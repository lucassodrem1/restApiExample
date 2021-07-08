const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

// Parser do json para permitir o uso do req.body.
app.use(express.json());

// Parser do cookie para permitir o uso do req.cookies.
app.use(cookieParser());

// Rotas da aplicação.
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// Middleware de rotas inexistentes.
app.all('*', (req, res, next) =>
  next(new AppError('Parece que essa rota não existe... :(', 404))
);

// Middleware para tratamento de erros.
app.use(errorController);

module.exports = app;
