const User = require("models/User");

const create = async (req, res) => {
  const newUser = new User({ username: "test-user" });
  await newUser.save().then(() => {
    console.log("user created");
    res.json({ success: true });
  });
};

const read = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const remove = async (req, res) => {
  await User.remove({});
  res.json({ success: true });
};

module.exports = {
  create,
  read,
  remove
};
