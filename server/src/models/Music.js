const mongoose = require("mongoose");

const musicSchema = mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  videoId: { type: String, required: true },
  star: { type: Number, default: 0, max: 5 }
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
