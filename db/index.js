const { Pool } = require('pg');
let connectionString = process.env.DOCKER_DATABASE_URL;

if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_URL;
} else if (
  process.env.NODE_ENV === 'test' &&
  process.env.TEST_ENV === 'local'
) {
  connectionString = process.env.TEST_DATABASE_URL;
} else if (
  process.env.NODE_ENV === 'test' &&
  process.env.TEST_ENV === 'docker'
) {
  connectionString = process.env.DOCKER_TEST_DATABASE_URL;
}

const pool = new Pool({
  connectionString,
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
