const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

/**
 * Tratamento de exceptions.
 */
process.on('uncaughtException', err => {
  console.log('Uncaught Exception!');
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');

const server = app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}...`)
);

/**
 * Tratamento de promises não tratadas
 * para que o servidor, quando em produção,
 * restartar ao dar unhandled rejection.
 */
process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection!');
  console.log(err.name, err.message);

  server.close(() => process.exit(1));
});
