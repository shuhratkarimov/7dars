const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Atlas connected successfully!"))
    .catch(() => console.log("error with connecting cloud database Atlas!"))
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
