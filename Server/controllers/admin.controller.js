const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email role createdAt');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers };