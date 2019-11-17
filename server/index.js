const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./src/connectdb");
const User = require("./src/models/User");

const PORT = 5000;

connectDB()
  .then(() => console.log("mongodb connected ..."))
  .catch(e => console.log(`failed to connect mongodb: ${e}`));

app.use(cors());

app.get("/api/hello", (req, res) => {
  res.send("hello mern project from server !!");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/api/users-create", async (req, res) => {
  const newUser = new User({ username: "test-user" });
  await newUser.save().then(() => {
    console.log("user created");
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
