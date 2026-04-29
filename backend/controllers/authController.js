const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const AppError = require("../utils/AppError");

// =========================
// SIGNUP (MongoDB)
// =========================

exports.signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      studentId,
      college,
      department,
      companyId,
      companyName,
      industry,
      location
    } = req.body;

    if (!email || !password || !role) {
      throw new AppError("Email, password, and role required", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === "student") {
      newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        studentId,
        college,
        department
      });
    } else if (role === "company") {
      newUser = new User({
        name: companyName,
        email,
        password: hashedPassword,
        role,
        companyId,
        companyName,
        industry,
        location
      });
    } else {
      throw new AppError("Invalid role", 400);
    }

    await newUser.save();

    res.json({
      message: "Account created successfully",
      role: newUser.role
    });

  } catch (err) {
    next(err);
  }
};

// =========================
// LOGIN (MongoDB)
// =========================

exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      throw new AppError("Email, password, role required", 400);
    }

    const user = await User.findOne({ email, role });

    if (!user) {
      throw new AppError("User not found", 401);
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Invalid password", 401);
    }

    // SESSION
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    // JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    // COOKIE
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax"
});
    res.json({
      message: "Login successful",
      role: user.role,
      name: user.companyName || user.name,
      token
    });

  } catch (err) {
    next(err);
  }
};