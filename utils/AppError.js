/**
 * Classe para transformar erros em operacionais.
 * Setar status e statusCode.
 * A classe servirá para distinguir se é um erro operacional
 * ou não, para que possa ser mostrado uma resposta adequada
 * para o cliente em produção.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

module.exports = AppError;
