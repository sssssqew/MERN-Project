const read = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const create = async (req, res) => {
  const newUser = new User({ username: "test-user" });
  await newUser.save().then(() => {
    console.log("user created");
    res.json({ success: true });
  });
};

module.exports = {
  read,
  create
};
