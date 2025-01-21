const { Router } = require("express");
const CommentsRouter = Router();
const CommentsValidator = require("../Middlewares/comments_validation_middleware");
const {
  getComments,
  addComments,
} = require("../Controller/comments.controller");
CommentsRouter.post("/add_comment", CommentsValidator, addComments);
CommentsRouter.get("/get_comments", getComments);

module.exports = CommentsRouter;
