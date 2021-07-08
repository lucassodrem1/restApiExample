const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(client => {
    console.log('DB connected!');
    client.release();
  })
  .catch(err => console.log(err));

/**
 * Método usado para reunir todas as chamadas
 * de query, permitindo que sejam definidas regras
 * nesse método e assim, essas regras irão servir
 * para todas as chamadas na aplicação inteira.
 * @param {String} text Query passada.
 * @param {Array} param Array de valores.
 * @returns {Promise} Resultado da query.
 */
exports.query = (text, param) => pool.query(text, param);
