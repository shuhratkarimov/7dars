const multer = require("multer");
const BaseError = require("../Utils/base_error");

module.exports = function fileUploader(req, res, next) {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file);
        cb(null, "uploads");
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
      },
    });
    const upload = multer({ storage: storage });
    upload.single("picture")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: "Rasm yuklanmadi, iltimos rasmni ham yuklang!" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Rasm yuklanmadi, iltimos rasmni ham yuklang!" });
      }
      next();
    });

  } catch (error) {
    next(error);
  }
}
