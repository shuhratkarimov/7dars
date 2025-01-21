const CommentsModel = require("../Schemas/comments.schema");
const MembersModel = require("../Schemas/members.schema");
const BooksModel = require("../Schemas/books.schema");
const BaseError = require("../Utils/base_error");

async function addComments(req, res, next) {
  try {
    const { member_info, book_info, comment } = req.body;
    const foundMember = await MembersModel.findOne({ _id: member_info });
    const foundBook = await BooksModel.findOne({ _id: book_info });
    if (foundMember) {
      if (foundBook) {
        await CommentsModel.create({ member_info, book_info, comment });
        return res.status(201).json({
          message: `${foundBook.title} kitobi bo'yicha ${foundMember.memberName}dan izoh qoldirildi!`,
        });
      }
      return next(
        BaseError.BadRequest(
          404,
          `Kechirasiz ${foundMember.memberName}, kutubxonamizda bunday kitob topilmadi...`
        )
      );
    }
    return next(
      BaseError.BadRequest(
        403,
        `Kechirasiz, izoh qoldirish uchun avval kutubxonamizga a'zo bo'lishingiz lozim!`
      )
    );
  } catch (error) {
    next(error);
  }
}

async function getComments(req, res, next) {
  try {
    const foundComments = await CommentsModel.find()
      .populate("member_info", ["memberName"])
      .populate({path: "book_info", select: "title", populate: {path: "author", select: "full_name"}});
    if (!foundComments) {
      return next(BaseError.BadRequest(403, "Hali izohlar mavjud emas!"));
    }
    res.status(201).json(foundComments);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addComments,
  getComments,
};
