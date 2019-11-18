const express = require("express");
const UserRouter = express.Router();
const User = require("models/User");

UserRouter.route("/").get(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

UserRouter.route("/create").get(async (req, res) => {
  const newUser = new User({ username: "test-user" });
  await newUser.save().then(() => {
    console.log("user created");
    res.json({ success: true });
  });
});

module.exports = UserRouter;
