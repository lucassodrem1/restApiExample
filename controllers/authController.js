const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');

exports.login = catchAsync(async (req, res, next) => {
  const token = await authService.login(req, res);

  res.status(200).json({
    status: 'success',
    token,
  });
});
