const { ref, required, date } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    member_info: {
      type: mongoose.Schema.ObjectId,
      ref: "members",
      required: [true, "A'zo ID'si kiritilishi lozim!"],
    },
    book_info: {
      type: mongoose.Schema.ObjectId,
      ref: "books",
      required: [true, "Izoh yoziladigan kitob ID'si kiritilishi lozim!"],
    },
    date: {
      type: String,
      default: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}, ${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
    },
    comment: {
      type: String,
      required: [true, "Kitob haqida fikrlaringiz kiritilishi lozim!"],
    },
  },
  { versionKey: false }
);

const CommentsModel = mongoose.model("comments", commentsSchema);
module.exports = CommentsModel;
