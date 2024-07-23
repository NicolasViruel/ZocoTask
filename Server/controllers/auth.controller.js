const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = require("../config");

const register = async (req, res) => {
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
    const token = await createAccessToken({ id: userSaved._id });

    // Devolver el token al cliente
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

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ msg: "Email is required" });
  if (!password)
    return res.status(400).send({ msg: "The password is required" });

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password" });

    const token = await createAccessToken({ id: userFound._id });

    // Devolver el token al cliente
    return res.status(200).json({
      token,
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  return res.sendStatus(200);
};

const verifyToken = async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
    });
  });
};

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    role: userSaved.role,
    createdAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
  res.send("profile");
};


module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken,
};
