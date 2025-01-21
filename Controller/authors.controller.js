const AuthorsModel = require("../Schemas/authors.schema");
const mongoose = require("mongoose");
const BaseError = require("../Utils/base_error");

////////////// get

async function getAuthors(req, res, next) {
  try {
    const authors = await AuthorsModel.find();
    if (authors.length === 0) {
      return next(BaseError.BadRequest(404, "Hali adiblar mavjud emas..."));
    }
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
}

////////////// search

async function searchAuthors(req, res, next) {
  try {
    const { name } = req.query;
    const authors = await AuthorsModel.find({
      full_name: { $regex: name, $options: "i" },
    });
    if (authors.length === 0) {
      return next(
        BaseError.BadRequest(404, "Ushbu qidiruv bo'yicha adiblar topilmadi...")
      );
    }
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
}

////////////// getOne

async function getOneAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return next(
        BaseError.BadRequest(404, "ID noto'g'ri formatda kiritilmoqda...")
      );
    }
    const author = await AuthorsModel.findById(id);
    if (!author) {
      return next(BaseError.BadRequest(404, "Bunday adib mavjud emas..."));
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
}

////////////// add

async function addAuthor(req, res, next) {
  try {
    const author = new AuthorsModel(req.body);
    await author.save();
    res.status(201).json({
      message: "Yangi adib ro'yxatga muvaffaqiyatli qo'shildi!",
    });
  } catch (error) {
    next(error);
  }
}

////////////// update

async function updateAuthor(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(BaseError.BadRequest(400, "Noto'g'ri ID formati!"));
    }
    const foundAuthor = await AuthorsModel.findById(id);
    if (!foundAuthor) {
      return next(BaseError.BadRequest(404, "Bunday adib topilmadi..."))
    }
    const updatedAuthor = await AuthorsModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(201).json({
      message: `Adib ${updatedAuthor.full_name}ning ma'lumotlari yangilandi!`,
    });
  } catch (error) {
    next(error);
  }
}

////////////// delete

async function deleteAuthor(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(BaseError.BadRequest(400, "Noto'g'ri ID formati!"));
    }
    const foundAuthor = await AuthorsModel.findById(id);
    if (!foundAuthor) {
      return res.status(404).json({
        message: "Bunday adib topilmadi...",
      });
    }
    await AuthorsModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: `Adib ${foundAuthor.full_name}ning ma'lumotlari muvaffaqiyatli o'chirib tashlandi!`,
    });
  } catch (error) {
    next(error);
  }
}

////////////// export

module.exports = {
  getAuthors,
  getOneAuthor,
  searchAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
