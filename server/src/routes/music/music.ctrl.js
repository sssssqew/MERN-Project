const Music = require("models/Music");

const index = async (req, res) => {
  const Musics = await Music.find();
  res.json(Musics);
};

const create = async (req, res) => {
  const newMusic = new Music(req.body);
  await newMusic.save().then(() => {
    res.json(newMusic);
  });
};

module.exports = {
  index,
  create
};
