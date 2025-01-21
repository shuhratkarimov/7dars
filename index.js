const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const connectDB = require("./config/DB_config");
const express = require("express");
const booksRouter = require("./Router/books.routes");
const error_middleware = require("./Middlewares/error_middleware");
const authorsRouter = require("./Router/author.routes");
const AuthRouter = require("./Router/auth.routes");
const fileUploadRouter = require("./Router/file.upload.routes");
const path = require("path");
const CommentsRouter = require("./Router/comments.routes");
const membersRouter = require("./Router/members.routes")
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(booksRouter);
app.use(authorsRouter);
app.use(AuthRouter);
app.use(express.static(path.join(__dirname, "uploads")));
app.use(fileUploadRouter);
app.use(CommentsRouter);
app.use(membersRouter)
app.use(error_middleware);
app.listen(PORT, () => {
  console.log("server is running on the port: " + PORT);
});
