const AuthorsValidation = require("../Validator/authors.validation");

module.exports = function AuthorsValidator(req, res, next) {
  try {
    const { error } = AuthorsValidation(req.body);
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
