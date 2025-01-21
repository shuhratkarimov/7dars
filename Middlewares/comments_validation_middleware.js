const CommentsValidation = require("../Validator/comments.validation");

module.exports = function CommentsValidator(req, res, next) {
  try {
    const { error } = CommentsValidation(req.body);
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
