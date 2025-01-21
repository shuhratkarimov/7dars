const { Router } = require("express");
const fileUploadRouter = Router();
const fileUploader = require("../Controller/file.upload.controller");
const VerifyToken = require("../Middlewares/verify_token_middleware")
fileUploadRouter.post("/upload", VerifyToken, fileUploader);
module.exports = fileUploadRouter;
