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
        res.json({ status: 201, msg: "Music saved in db successfully !" });
      });
    } else {
      console.log("this video already exists in db !!");
      res.json({ status: 204, msg: "Music already exists in db ):" });
    }
  });
};

const remove = (req, res) => {
  Music.findByIdAndRemove(req.params.id, (err, Music) => {
    if (err) throw err;
    res.json({ status: 204, msg: `${Music.title} is deleted successfully !` });
  });
};

module.exports = {
  index,
  create,
  remove
};
