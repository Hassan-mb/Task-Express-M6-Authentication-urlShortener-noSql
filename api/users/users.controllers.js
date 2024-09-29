const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generate } = require("shortid");
dotenv.config();

const saltRounds = 10;

hashPassword = async (password) => {
  try {
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("i told aya to do this");
  }
};

generateToken = async (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    const hashify = await hashPassword(password);
    req.body.password = hashify;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(201).json({ token: token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
