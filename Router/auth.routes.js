const { Router } = require("express");
const { register, login, verify } = require("../Controller/auth.controller");
const AuthValidator = require("../Middlewares/auth_validation_middleware.js");
const AuthRouter = Router();

AuthRouter.post("/register", AuthValidator, register);
AuthRouter.post("/login", login);
AuthRouter.post("/verify", verify);

module.exports = AuthRouter;
