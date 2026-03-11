const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");
const AppError = require("../utils/AppError");

const usersFile = path.join(__dirname, "../data/users.json");


// =========================
// SIGNUP
// =========================

exports.signup = (req, res) => {
  const users = readData(usersFile);

  const {
    name,
    email,
    password,
    role,
    studentId,
    college,
    department,
    companyName,
    industry,
    location
  } = req.body;

  if (!name || !email || !password || !role) {
    throw new AppError("Name, email, password, and role are required", 400);
  }

  if (role !== "student" && role !== "company") {
    throw new AppError("Only student and company signup is allowed", 400);
  }

  if(role === "admin"){
    throw new AppError("Admin accounts cannot be created", 403);
  }

  const existingUser = users.find(u => u.email === email);

  if(existingUser){
    throw new AppError("User already exists", 400);
  }

  let newUser;

  if(role === "student"){
    if (!studentId || !college || !department) {
      throw new AppError("Student ID, college, and department are required", 400);
    }

    newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      studentId,
      college,
      department
    };

  }

  else if(role === "company"){
    if (!companyName || !industry || !location) {
      throw new AppError("Company name, industry, and location are required", 400);
    }

    newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      companyName,
      industry,
      location
    };

  }

  users.push(newUser);

  writeData(usersFile, users);

  res.json({
    message: "Account created successfully",
    role: newUser.role,
    companyName: newUser.companyName || ""
  });

};


// =========================
// LOGIN
// =========================

exports.login = (req, res) => {
  const users = readData(usersFile);

  const { email, password, role, adminId, studentId } = req.body;

  if (!email || !password || !role) {
    throw new AppError("Email, password, and role are required", 400);
  }

  let user;

  if(role === "admin"){

    user = users.find(
      u =>
      u.email === email &&
      u.password === password &&
      u.role === "admin" &&
      String(u.adminId) === String(adminId)
    );

  }

  else if(role === "student"){

    user = users.find(
      u =>
      u.email === email &&
      u.password === password &&
      u.role === "student" &&
      String(u.studentId) === String(studentId)
    );

  }

  else if(role === "company"){

    user = users.find(
      u =>
      u.email === email &&
      u.password === password &&
      u.role === "company"
    );

  }

  if(!user){
    throw new AppError("Invalid credentials", 401);
  }

  res.json({
    message:"Login successful",
    role:user.role,
    name:user.name,
    companyName:user.companyName || "",
    email:user.email
  });

};
