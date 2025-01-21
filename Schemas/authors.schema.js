const  mongoose  = require("mongoose");
const {Schema} = mongoose

const authorsSchema = new Schema({
  full_name: {
     type: String, 
     required: [true, "Muallifning to'liq ismi kiritilishi kerak!"] 
    },
  dateOfBirth: {
     type: Date, 
     required: [true, "Muallifning tug'ilgan sanasi kiritilishi kerak!"] 
    },
  dateOfDeath: { type: Date },
  country: {
     type: String, 
     required: [true, "Muallifning vatani kiritilishi kerak!"] 
    },
  bio: {
     type: String, 
     required: [true, "Muallif haqida ma'lumot kiritilishi kerak!"] 
    },
}, 
{versionKey: false});
const AuthorsModel = mongoose.model("authors", authorsSchema);
module.exports = AuthorsModel;
