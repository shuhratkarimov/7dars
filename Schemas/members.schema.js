const mongoose = require("mongoose");
const { Schema } = mongoose;

const membersSchema = new Schema(
  {
    memberName: {
      type: String,
      required: [true, "A'zoning ismi yozilishi shart!"],
      minLength: [
        3,
        "A'zoning ismi kamida 3 ta belgidan iborat bo'lishi kerak!",
      ],
      maxLength: [
        40,
        "A'zoning ismi ko'pi bilan 40 ta belgidan iborat bo'lishi lozim!",
      ],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "A'zoning yoshi kiritilishi lozim!"],
      min: [7, "A'zoning yoshi kamida 7 bo'lishi kerak!"],
      max: [100, "A'zoning yoshi ko'pi bilan 100 bo'lishi lozim!"],
    },
    dateOfMembership: {
      type: String,
      default: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}, ${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
    },
  },
  { versionKey: false }
);

const MemeberModel = mongoose.model("members", membersSchema);
module.exports = MemeberModel;
