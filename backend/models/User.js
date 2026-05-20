const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  role: String,
  studentId: String,
  college: String,
  department: String,
  companyId: String,
  companyName: String,
  industry: String,
  location: String

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);