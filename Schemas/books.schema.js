const mongoose = require("mongoose");
const { Schema } = mongoose;

const currentYear = new Date().getFullYear();
const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Kitobning nomi yozilishi shart!"],
      minLength: [
        2,
        "Kitobning nomi kamida 2 ta belgidan iborat bo'lishi kerak!",
      ],
      maxLength: [
        40,
        "Kitobning nomi ko'pi bilan 40 ta belgidan iborat bo'lishi lozim!",
      ],
      trim: true,
    },
    pages: {
      type: Number,
      required: [true, "Varaqlar soni kiritilishi lozim!"],
      min: [5, "Kitobning varaqlari kamida 10 ta bo'lishi kerak!"],
      max: [2000, "Kitobning varaqlari ko'pi bilan 2000 ta bo'lishi lozim!"],
    },
    year: {
      type: Number,
      required: [true, "Kitobning chop etilgan yili kiritilishi lozim!"],
      min: [1500, "Kitob chop etilgan yil kamida 1500 bo'lishi kerak!"],
      validate: {
        validator: function (value) {
          return value <= currentYear;
        },
        message: `Kitob ko'pi bilan ${currentYear} yil chop etilgan bo'lishi mumkin`,
      },
    },
    price: {
      type: Number,
      required: [
        true,
        "Kitobning narxi yoki bepul ekanligi kiritilishi lozim!",
      ],
    },
    country: {
      type: String,
      required: [
        true,
        "Kitob qaysi devlatga tegishli ekanligi kiritilishi lozim!",
      ],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "authors",
      required: [true, "Muallif ID'si kiritilishi lozim"],
    },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

const BooksModel = mongoose.model("books", booksSchema);
module.exports = BooksModel;
