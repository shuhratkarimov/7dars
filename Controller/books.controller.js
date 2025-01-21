const BooksModel = require("../Schemas/books.schema");
const mongoose = require("mongoose");
const BaseError = require("../Utils/base_error");

////////////// get

async function getBooks(req, res, next) {
  try {
    const books = await BooksModel.find().populate("author");
    if (books.length === 0) {
      return next(BaseError.BadRequest(404, "Hali adiblar mavjud emas..."));
    }
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
}

////////////// search

async function searchBooks(req, res, next) {
  try {
    const { title } = req.query;
    const books = await BooksModel.find({
      title: { $regex: title, $options: "i" },
    }).populate("author");
    if (books.length === 0) {
      return next(
        BaseError.BadRequest(
          404,
          "Ushbu qidiruv bo'yicha kitoblar topilmadi..."
        )
      );
    }
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
}

////////////// getOne

async function getOneBook(req, res, next) {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return next(
        BaseError.BadRequest(404, "ID noto'g'ri formatda kiritilmoqda...")
      );
    }
    const book = await BooksModel.findById(id).populate("author");
    if (!book) {
      return next(BaseError.BadRequest(404, "Bunday kitob mavjud emas..."));
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

////////////// add

async function addBook(req, res, next) {
  try {
    const book = new BooksModel(req.body);
    await book.save();
    res.status(201).json({
      message: "Yangi kitob ro'yxatga muvaffaqiyatli qo'shildi!",
    });
  } catch (error) {
    next(error);
  }
}

////////////// update

async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(BaseError.BadRequest(400, "Noto'g'ri ID formati!"));
    }
    const foundBook = await BooksModel.findById(id);
    if (!foundBook) {
      return next(BaseError.BadRequest(404, "Bunday kitob topilmadi..."));
    }
    await BooksModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: `${foundBook.title} kitobining ma'lumotlari muvaffaqiyatli yangilandi!`,
    });
  } catch (error) {
    next(error);
  }
}

////////////// delete

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(BaseError.BadRequest(400, "Noto'g'ri ID formati!"));
    }
    const foundBook = await BooksModel.findById(id);
    if (!foundBook) {
      return next(BaseError.BadRequest(404, "Bunday kitob topilmadi..."));
    }
    await BooksModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: `${foundBook.title} kitobining ma'lumotlari muvaffaqiyatli o'chirib tashlandi!`,
    });
  } catch (error) {
    next(error);
  }
}

////////////// export

module.exports = {
  getBooks,
  getOneBook,
  searchBooks,
  addBook,
  updateBook,
  deleteBook,
};
