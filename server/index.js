const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

const connectDB = require("connectdb");
const routes = require("routes");

const PORT = 5000;

connectDB()
  .then(() => console.log("mongodb connected ..."))
  .catch(e => console.log(`failed to connect mongodb: ${e}`));

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // express 4.16 이상은 body-parser를 포함하고 있음

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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
