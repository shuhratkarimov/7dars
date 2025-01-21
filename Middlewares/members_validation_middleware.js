const MembersValidation = require("../Validator/members.validation");

module.exports = function MembersValidator(req, res, next) {
  try {
    const { error } = MembersValidation(req.body);
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
