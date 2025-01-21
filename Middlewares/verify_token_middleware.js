const jwt = require("jsonwebtoken");
const BaseError = require("../Utils/base_error");

module.exports = function VerifyToken(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return next(
        BaseError.BadRequest(
          403,
          "Siz admin emassiz va shu sababli ma'lumotlar bilan ishlash qamrovi cheklangan!"
        )
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
