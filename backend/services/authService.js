const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

// ========================
// SIGNUP SERVICE
// ========================
exports.signupUser = async (data) => {

  const {
    name,
    fullName,
    email,
    password,
    confirmPassword,
    studentId,
    college,
    collegeName,
    department,
    collegeDepartment
  } = data;

  // ========================
  // HANDLE BOTH OLD + NEW FIELD NAMES
  // ========================

  const finalFullName = fullName || name;
  const finalCollegeName = collegeName || college;
  const finalDepartment = collegeDepartment || department;

  console.log("Incoming signup data:", data);

  // ========================
  // BASIC VALIDATION
  // ========================

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // ========================
  // PASSWORD MATCH CHECK
  // ========================

  if (confirmPassword && password !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }

  // ========================
  // CHECK EXISTING USER
  // ========================

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // ========================
  // HASH PASSWORD
  // ========================

  const hashedPassword = await bcrypt.hash(password, 10);

  // ========================
  // CREATE USER
  // ========================

  const newUser = await prisma.user.create({
    data: {
      fullName: finalFullName || "",
      email,
      password: hashedPassword,
      studentId: studentId || "",
      collegeName: finalCollegeName || "",
      collegeDepartment: finalDepartment || "",
      role: "student"
    }
  });

  console.log("User created successfully");

  return newUser;
};

// ========================
// LOGIN SERVICE
// ========================
exports.loginUser = async ({ email, password }) => {

  // ========================
  // VALIDATION
  // ========================

  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

  // ========================
  // FIND USER
  // ========================

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  // ========================
  // COMPARE PASSWORD
  // ========================

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  // ========================
  // GENERATE TOKEN
  // ========================

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

  // ========================
  // CHECK USER EXISTS
  // ========================

  const existingUser = await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  // ========================
  // HASH PASSWORD IF UPDATED
  // ========================

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  // ========================
  // UPDATE USER
  // ========================

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id)
    },
    data
  });

  return updatedUser;
};