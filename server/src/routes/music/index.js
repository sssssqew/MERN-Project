const express = require("express");
const MusicRouter = express.Router();
const MusicController = require("./music.ctrl");

MusicRouter.route("/").get(MusicController.index);
// MusicRouter.route("/:id").get(MusicController.read);
MusicRouter.route("/").post(MusicController.create);
// MusicRouter.route("/:id").put(MusicController.update);
// MusicRouter.route("/:id").delete(MusicController.remove);

module.exports = MusicRouter;
