const express = require("express");
const UserRouter = express.Router();
const UserController = require("./user.ctrl");

UserRouter.route("/create").get(UserController.create); // create
UserRouter.route("/").get(UserController.read); // read
UserRouter.route("/delete").get(UserController.remove); // delete

module.exports = UserRouter;
