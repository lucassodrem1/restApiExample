const authService = require('../services/authService');

exports.login = async (req, res, next) => {
  const token = await authService.login(req, res);

  res.status(200).json({
    status: 'success',
    token,
  });
};
