const AuthValidation = require("../Validator/auth.validation");

module.exports = function AuthValidator(req, res, next) {
  try {
    const { error } = AuthValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    throw new Error(error.message);
  }
};
