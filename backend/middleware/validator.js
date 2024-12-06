const { validationResult, check } = require('express-validator');

exports.validateRegistration = [
  check('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  check('email').trim().isEmail().withMessage('Please enter a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.validateLogin = [
  check('email').trim().isEmail().withMessage('Please enter a valid email'),
  check('password').exists().withMessage('Password is required'),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};