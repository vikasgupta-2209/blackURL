const User = require("../model/userAuthDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "mySecretKey";

// Signup
const handlesignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send("Email already registered.");
    

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, secret);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Signup failed.");
  }
};

// Login
const handlelogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Incorrect password");

    const token = jwt.sign({ userId: user._id }, secret);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
};

// Logout
const handlelogout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = {
  handlesignup,
  handlelogin,
  handlelogout,
};