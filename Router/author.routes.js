const {Router} = require("express")
const {getAuthors, getOneAuthor, searchAuthors, addAuthor, updateAuthor, deleteAuthor} = require("../Controller/authors.controller")
const authorsRouter = Router()
const AuthorsValidator = require("../Middlewares/authors_validation_middleware")
const VerifyToken = require("../Middlewares/verify_token_middleware")
// const fileUploader = require("../Middlewares/file_upload_middleware")

authorsRouter.get("/get_authors", getAuthors)
authorsRouter.get("/get_one_author/:id", getOneAuthor)
authorsRouter.get("/search_authors", searchAuthors)
authorsRouter.post("/add_author", [AuthorsValidator, VerifyToken], addAuthor)
authorsRouter.put("/update_author/:id", VerifyToken, updateAuthor)
authorsRouter.delete("/delete_author/:id", VerifyToken, deleteAuthor)

module.exports = authorsRouter