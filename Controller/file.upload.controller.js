const multer = require("multer");
const BaseError = require("../Utils/base_error");
const path = require("path");

module.exports = function fileUploader(req, res, next) {
  try {
    let fileNewName;
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        fileNewName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, path.join(__dirname, "../uploads"));
      },
      filename: (req, file, cb) => {
        cb(null, fileNewName);
      },
    });
    const upload = multer({ storage: storage });
    upload.single("picture")(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Rasm yuklanmadi, iltimos rasmni yuklang!" });
      }
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "Rasm yuklanmadi, iltimos rasmni yuklang!" });
      }
      res.status(201).json({
        message: "Rasm muvaffaqiyatli yuklandi",
        link: `${req.protocol}://${req.get("host")}/${fileNewName}`,
      });
    });
  } catch (error) {
    next(error);
  }
};
