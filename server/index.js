const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("connectdb");
const UserRouter = require("routes/UserRouter");

const PORT = 5000;

connectDB()
  .then(() => console.log("mongodb connected ..."))
  .catch(e => console.log(`failed to connect mongodb: ${e}`));

app.use(cors());
app.use("/api/users", UserRouter);

app.get("/api/hello", (req, res) => {
  res.send("hello mern project from server !!");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
