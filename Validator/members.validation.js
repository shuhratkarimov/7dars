const Joi = require("joi");

const MembersValidation = (data) => {
  try {
    const MembersValidationSchema = Joi.object({
      memberName: Joi.string().min(3).max(30).required().messages({
        "string.base": "A'zoning ismi string ko'rinishida bo'lishi kerak!",
        "string.empty": "A'zoning ismi bo'sh bo'lmasligi kerak!",
        "any.required": "A'zoning ismi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "A'zoning ismi kamida 3 (uch)ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "A'zoning ismi ko'pi bilan 30 (o'ttiz)ta belgidan iborat bo'lishi mumkin!",
      }),
      age: Joi.number().min(7).max(100).required().messages({
        "number.base": "A'zoning yoshi raqam ko'rinishida bo'lishi kerak!",
        "number.empty": "A'zoning yoshi bo'sh bo'lmasligi kerak!",
        "any.required": "A'zoning yoshi talab qilinadi va kiritilishi lozim!",
        "number.min": "A'zoning yoshi kamida 7 (yetti) bo'lishi lozim!",
        "number.max": "A'zoning yoshi ko'pi bilan 100 (yuz) bo'lishi mumkin!",
      }),
    });
    return MembersValidationSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = MembersValidation;
