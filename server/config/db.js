const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");
const db = config.get("raghavMongoURI");

const connectDB = async () => {
  console.log(db);
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error("Error while connecting DB - ", err.message);
    // process.exit(1);
  }
};

module.exports = connectDB;
