const mongoose = require("mongoose");
const CONNECT_URL = `mongodb://mongodb:${process.env.MONGO_PORT}/mern`; // mern: db name

const connectDB = () => {
  return mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = connectDB;
