const mongoose = require("mongoose");

const musicSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  videoId: { type: String, required: true, trim: true, unique: true }, // trim을 이용하여 사용자가 공백을 추가한 경우 제거해줌
  star: { type: Number, default: 0, max: 5 }
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
