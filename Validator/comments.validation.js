const Joi = require("joi");

const CommentsValidation = (data) => {
  try {
    const CommentsValidationSchema = Joi.object({
      member_info: Joi.string().required().messages({
        "string.base":
          "Izoh yozuvchining ID'si string ko'rinishida bo'lishi kerak!",
        "string.empty": "Izoh yozuvchining ID'si bo'sh bo'lmasligi kerak!",
        "any.required":
          "Izoh yozuvchining ID'si talab qilinadi va kiritilishi lozim!",
      }),
      book_info: Joi.string().required().messages({
        "string.base":
          "Izoh yoziladigan kitob ID'si string ko'rinishida bo'lishi kerak!",
        "string.empty": "Izoh yoziladigan kitob ID'si bo'sh bo'lmasligi kerak!",
        "any.required":
          "Izoh yoziladigan kitob ID'si talab qilinadi va kiritilishi lozim!",
      }),
      comment: Joi.string().min(3).max(1000).required().messages({
        "string.base": "Izohlar string turida bo'lishi kerak!",
        "string.empty": "Izohlar bo'sh bo'lmasligi kerak!",
        "any.required":
          "Izohlar talab qilinadi va kiritilishi lozim!",
      })
    });
    return CommentsValidationSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = CommentsValidation;
