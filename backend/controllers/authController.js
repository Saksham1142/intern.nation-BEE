const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");

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

  if(role === "admin"){
    return res.status(403).json({
      message: "Admin accounts cannot be created"
    });
  }

  const existingUser = users.find(u => u.email === email);

  if(existingUser){
    return res.status(400).json({
      message: "User already exists"
    });
  }

  let newUser;

  if(role === "student"){

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
    role: newUser.role
  });

};


// =========================
// LOGIN
// =========================

exports.login = (req, res) => {

  const users = readData(usersFile);

  const { email, password, role, adminId, studentId } = req.body;

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
    return res.status(401).json({
      message:"Invalid credentials"
    });
  }

  res.json({
    message:"Login successful",
    role:user.role,
    name:user.name
  });

};