const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cluster = require("cluster");
const mongoose = require("mongoose");

const connectDB = require("connectdb");
const routes = require("routes");

// remove deprecated error
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

connectDB()
  .then(() => console.log("mongodb connected ..."))
  .catch(e => console.log(`failed to connect mongodb: ${e}`));

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // express 4.16 이상은 body-parser를 포함하고 있음

// 사용자가 요청한 워커가 어느 것인지 확인하기 위함
app.use((req, res, next) => {
  if (cluster.isWorker) {
    console.log(
      `Worker ${cluster.worker.process.pid} received request from user...`
    );
    next();
  }
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/api/hello", (req, res) => {
  res.send("hello mern project from server !!");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ msg: "Sorry can't find that!" });
});

// 505 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something is broken down on server ):" });
});

module.exports = app;
