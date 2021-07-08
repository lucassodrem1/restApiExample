const express = require('express');
const userRouter = require('./routes/userRouter');
const errorController = require('./controllers/errorController');

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) =>
  next(new AppError('Parece que essa rota não existe... :(', 500))
);

app.use(errorController);

module.exports = app;
