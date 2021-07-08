/**
 * Método para tratar todos os throws jogados
 * dentro dos métodos asyncs das controllers e
 * services.
 * @param {Function} fn
 * @returns {Function}
 */
module.exports = fn => (req, res, next) =>
  fn(req, res, next).catch(err => next(err));
