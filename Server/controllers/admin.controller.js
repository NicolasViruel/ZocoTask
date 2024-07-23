const User = require("../models/user.model");
const bcrypt = require("bcryptjs");


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email role createdAt');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!email) return res.status(400).send({ msg: "Email is required" });
  if (!password)
    return res.status(400).send({ msg: "The password is required" });

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email already in use"]);

    const passwordHash = await bcrypt.hash(password, 5);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: role || 'user'
    });

    const userSaved = await newUser.save();

    return res.status(200).json({
      token,
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) =>{
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, role},
      { new: true}
    );
    if (!user) return res.status(404).json({ message: "User not Found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) =>{
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if(!user) return res.status(404).json({ message: "User not found"});
    res.status(200).json({ message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { 
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};