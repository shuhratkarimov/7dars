const MembersModel = require("../Schemas/members.schema");
const BaseError = require("../Utils/base_error");

async function addMembers(req, res, next) {
  try {
    const { memberName, age } = req.body;
    const foundMember = await MembersModel.findOne({ memberName });
    if (foundMember) {
      return next(
        BaseError.BadRequest(403, "Siz oldin a'zolar ro'yxatiga qo'shilgansiz!")
      );
    }
    await MembersModel.create(req.body);
    res.status(201).json({
      message: `${memberName}, siz kutubxonaga a'zo bo'ldingiz!`,
    });
  } catch (error) {
    next(error);
  }
}

async function getMembers(req, res, next) {
  try {
    const foundMembers = await MembersModel.find();
    if (!foundMembers) {
      return next(BaseError.BadRequest(403, "Hali a'zolar mavjud emas!"));
    }
    res.status(201).json(foundMembers);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMembers,
  addMembers,
};
