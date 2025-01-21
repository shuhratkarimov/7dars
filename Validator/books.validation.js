const Joi = require("joi");
const currentYear = new Date().getFullYear();

const BooksValidation = (data) => {
  try {
    const BooksValidationSchema = Joi.object({
      title: Joi.string().min(2).max(40).required().messages({
        "string.base": "Kitob nomi string ko'rinishida bo'lishi kerak!",
        "string.empty": "Kitob nomi bo'sh bo'lmasligi kerak!",
        "any.required": "Kitob nomi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Kitob nomi kamida 2 (ikki)ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Kitob nomi ko'pi bilan 40 (qirq)ta belgidan iborat bo'lishi mumkin!",
      }),
      pages: Joi.number().min(5).max(5000).required().messages({
        "number.base": "Kitob sahifalari raqam ko'rinishida bo'lishi kerak!",
        "number.empty": "Kitob sahifalari soni bo'sh bo'lmasligi kerak!",
        "any.required": "Kitob sahifasi talab qilinadi va kiritilishi lozim!",
        "number.min": "Kitob sahifalari kamida 5 (besh)ta bo'lishi lozim!",
        "number.max":
          "Kitob sahifalari ko'pi bilan 5000 (besh ming)ta  bo'lishi mumkin!",
      }),
      year: Joi.number()
        .min(1500)
        .max(currentYear)
        .required()
        .messages({
          "number.base": "Kitob yili raqam ko'rinishida bo'lishi kerak!",
          "number.empty": "Kitob yili bo'sh bo'lmasligi kerak!",
          "any.required": "Kitob yili talab qilinadi va kiritilishi lozim!",
          "number.min": "Kitob yili kamida 1500 bo'lishi lozim!",
          "number.max": `Kitob yili ko'pi bilan ${currentYear} bo'lishi mumkin!`,
        }),
      price: Joi.number().min(0).required().messages({
        "number.base": "Kitob narxi raqam ko'rinishida bo'lishi kerak!",
        "number.empty": "Kitob narxi bo'sh bo'lmasligi kerak!",
        "any.required": "Kitob narxi talab qilinadi va kiritilishi lozim!",
        "number.min": "Kitob narxi kamida 0 bo'lishi lozim!",
      }),
      country: Joi.string().min(2).max(80).required().messages({
        "string.base":
          "Kitob qaysi davlatga tegishliligi string ko'rinishida bo'lishi kerak!",
        "string.empty":
          "Kitob qaysi davlatga tegishliligi bo'sh bo'lmasligi kerak!",
        "any.required":
          "Kitob qaysi davlatga tegishliligi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Kitob tegishli bo'lgan davlat nomi kamida ikkita belgidan iborat bo'lishi lozim!",
        "string.max":
          "Kitob tegishli bo'lgan davlat nomi ko'pi bilan 80ta belgidan iborat bo'lishi mumkin!",
      }),
      author: Joi.string().min(1).max(100).required().messages({
        "string.base": "Kitob muallifi string ko'rinishida bo'lishi kerak!",
        "string.empty": "Kitob muallifi bo'sh bo'lmasligi kerak!",
        "any.required": "Kitob muallifi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Kitob muallifi kamida 2ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Kitob muallifi ko'pi bilan 100ta belgidan iborat bo'lishi mumkin!",
      }),
      description: Joi.string().min(10).max(5000).required().messages({
        "string.base":
          "Kitob haqida batafsil ma'lumot string ko'rinishida bo'lishi kerak!",
        "string.empty":
          "Kitob haqida batafsil ma'lumot bo'sh bo'lmasligi kerak!",
        "any.required":
          "Kitob haqida batafsil ma'lumot talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Kitob haqida batafsil ma'lumot kamida 10ta belgidan iborat bo'lishi lozim!",
        "string.max":
          "Kitob haqida batafsil ma'lumot ko'pi bilan 5000ta belgidan iborat bo'lishi mumkin!",
      }),
    });
    return BooksValidationSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = BooksValidation;
