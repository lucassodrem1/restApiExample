const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) =>
  next(new AppError('Parece que essa rota não existe... :(', 404))
);

app.use(errorController);

module.exports = app;
