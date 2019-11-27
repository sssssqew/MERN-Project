const express = require("express");
const router = express.Router();
const user = require("routes/user");
const music = require("routes/music");

router.use("/users", user);
router.use("/musics", music);

module.exports = router;
