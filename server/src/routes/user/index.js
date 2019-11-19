const express = require("express");
const User = require("models/User");
const UserRouter = express.Router();
const UserController = require("./user.ctrl");

UserRouter.route("/create").get(UserController.create); // create
UserRouter.route("/").get(UserController.read); // read

module.exports = UserRouter;
