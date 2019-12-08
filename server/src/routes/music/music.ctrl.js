const Music = require("models/Music");
const fetch = require("node-fetch");

const isValid = (str, url) => {
  const decodedText = decodeURIComponent(str);
  return decodedText.indexOf(url) !== -1;
};

const index = async (req, res) => {
  const musics = await Music.find();
  res.json(musics);
};

const read = async (req, res) => {
  Music.findById(req.params.id, (err, music) => {
    if (err) throw err;
    res.json(music);
  });
};

const create = (req, res) => {
  console.log("video id: ", req.body.videoId);
  Music.findOne({ videoId: req.body.videoId }, async (err, music) => {
    if (err) throw err;
    // 중복체크
    if (!music) {
      const newMusic = new Music(req.body);
      await newMusic.save().then(() => {
        res.json({
          status: 201,
          msg: "New Music video created in db successfully !"
        });
      });
    } else {
      console.log("this video already exists in db !!");
      res.json({ status: 204, msg: "Music already exists in db ):" });
    }
  });
};

const update = (req, res) => {
  Music.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, music) => {
      if (err) throw err;
      res.json({
        status: 204,
        msg: `${music.title} is updated successfully !`
      });
    }
  );
};

const remove = (req, res) => {
  Music.findByIdAndRemove(req.params.id, (err, music) => {
    if (err) throw err;
    res.json({ status: 204, msg: `${music.title} is deleted successfully !` });
  });
};

const checkVideoId = (req, res) => {
  const { videoInfoUrl, videoUrl } = req.body;
  const text = fetch(videoInfoUrl)
    .then(res => res.text())
    .then(text => {
      res.json({ videoIsValid: isValid(text, videoUrl) });
    });
};

module.exports = {
  index,
  read,
  create,
  update,
  remove,
  checkVideoId
};
