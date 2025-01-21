const BooksValidation = require("../Validator/books.validation");

module.exports = function BooksValidator(req, res, next) {
  try {
    const { error } = BooksValidation(req.body);
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
