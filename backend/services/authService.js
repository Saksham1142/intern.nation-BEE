const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

// ========================
// SIGNUP SERVICE
// ========================
exports.signupUser = async (data) => {

  const {
    fullName,
    email,
    password,
    confirmPassword,
    studentId,
    collegeName,
    collegeDepartment
  } = data;

  // Validate fields
  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !studentId ||
    !collegeName ||
    !collegeDepartment
  ) {
    throw new AppError("All fields are required", 400);
  }

  // Password match check
  if (password !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }

  // Check existing user
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      studentId,
      collegeName,
      collegeDepartment,
      role: "Student"
    }
  });

  return newUser;
};

// ========================
// LOGIN SERVICE
// ========================
exports.loginUser = async ({ email, password }) => {

  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  // Generate token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    "secretkey",
    {
      expiresIn: "1h"
    }
  );

  return {
    user,
    token
  };
};

// ========================
// UPDATE USER BY ID
// ========================
exports.updateUserById = async (id, data) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  // Hash password if updated
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id)
    },
    data
  });

  return updatedUser;
};