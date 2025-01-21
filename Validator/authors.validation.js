const Joi = require("joi");
const currentYear = new Date().getFullYear();

const AuthorsValidation = (data) => {
  try {
    const AuthorsValidationSchema = Joi.object({
      full_name: Joi.string().min(2).max(100).required().messages({
        "string.base":
          "Adibning to'liq ismi string ko'rinishida bo'lishi kerak!",
        "string.empty": "Adibning to'liq ismi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Adibning to'liq ismi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Adibning to'liq ismi kamida 2 (ikki)ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Adibning to'liq ismi ko'pi bilan 100 (yuz)ta belgidan iborat bo'lishi mumkin!",
      }),
      dateOfBirth: Joi.date().required().messages({
        "date.base": "Adib tug'ilgan sanasi sana ko'rinishida bo'lishi kerak!",
        "date.empty": "Adib tug'ilgan sanasi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Adib tug'ilgan sanasi talab qilinadi va kiritilishi lozim!",
      }),
      dateOfDeath: Joi.string(),
      country: Joi.string().min(2).max(80).required().messages({
        "string.base": "Adibning yurti string ko'rinishida bo'lishi kerak!",
        "string.empty": "Adibning yurti bo'sh bo'lmasligi kerak!",
        "any.required": "Adibning yurti talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Adibning yurti kamida ikkita belgidan iborat bo'lishi lozim!",
        "string.max":
          "Adibning yurti ko'pi bilan 80ta belgidan iborat bo'lishi mumkin!",
      }),
      bio: Joi.string().min(10).max(5000).required().messages({
        "string.base":
          "Adib haqida batafsil ma'lumot string ko'rinishida bo'lishi kerak!",
        "string.empty":
          "Adib haqida batafsil ma'lumot bo'sh bo'lmasligi kerak!",
        "any.required":
          "Adib haqida batafsil ma'lumot talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Adib haqida batafsil ma'lumot kamida 10ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Adib haqida batafsil ma'lumot ko'pi bilan 5000ta belgidan iborat bo'lishi mumkin!",
      }),
    });
    return AuthorsValidationSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = AuthorsValidation;
