const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

// LOGIN LOGIC
exports.loginUser = async ({ email, password, role }) => {

  if (!email || !password || !role) {
    throw new AppError("Email, password, role required", 400);
  }

  const user = await User.findOne({ email, role });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secretkey",
    { expiresIn: "1h" }
  );

  return {
    user,
    token
  };
};

// SIGNUP LOGIC
exports.signupUser = async (data) => {

  const { email, password, role } = data;

  if (!email || !password || !role) {
    throw new AppError("Email, password, role required", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    ...data,
    password: hashedPassword
  });

  await newUser.save();

  return newUser;
};