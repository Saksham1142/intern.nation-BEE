const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  studentId: String,
  college: String,
  department: String,
  companyId: String,
  companyName: String,
  industry: String,
  location: String
});

module.exports = mongoose.model("User", userSchema);