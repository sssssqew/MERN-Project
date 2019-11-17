const mongoose = require("mongoose");
const CONNECT_URL = "mongodb://mongodb:27017/users";

const connectDB = () => {
  return mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = connectDB;
