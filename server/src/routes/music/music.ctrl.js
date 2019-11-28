const Music = require("models/Music");

const index = async (req, res) => {
  const Musics = await Music.find();
  res.json(Musics);
};

const create = (req, res) => {
  console.log("video id: ", req.body.videoId);
  Music.findOne({ videoId: req.body.videoId }, async (err, result) => {
    if (err) throw err;
    // 중복체크
    if (!result) {
      const newMusic = new Music(req.body);
      await newMusic.save().then(() => {
        res.json(newMusic);
      });
    } else {
      console.log("this video already exists in db !!");
      res.json(result);
    }
  });
};

module.exports = {
  index,
  create
};
