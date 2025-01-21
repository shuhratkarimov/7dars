const Joi = require("joi");

const AuthValidation = (data) => {
  try {
    const AuthSchemaValidation = Joi.object({
      username: Joi.string().required().messages({
        "string.base":
          "Foydalanuvchi nomi turi string ko'rinishida bo'lishi kerak!",
        "string.empty": "Foydalanuvchi nomi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Foydalanuvchi nomi talab qilnadi va kiritilishi lozim!",
      }),
      email: Joi.string().email().required().messages({
        "string.base": "Email turi string ko'rinishida bo'lishi kerak!",
        "string.email":
          "Email yaroqli bo'lishi (bitta @ mavjud bo'lishi va faqat string va raqamlardan iborat bo'lishi) kerak!",
        "string.empty": "Email bo'sh bo'lmasligi kerak!",
        "any.required": "Email talab qilnadi va kiritilishi lozim!",
      }),
      password: Joi.alternatives()
        .try(Joi.string(), Joi.number())
        .required()
        .messages({
          "string.base": "Parol turi string bo'lishi kerak!",
          "number.base": "Parol turi raqam bo'lishi kerak",
          "string.empty": "Parol bo'sh bo'lmasligi kerak!",
          "number.empty": "Parol bo'sh bo'lmasligi kerak!",
          "any.required": "Parol talab qilinadi va kiritilishi lozim!",
        })
    });
    return AuthSchemaValidation.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = AuthValidation;
