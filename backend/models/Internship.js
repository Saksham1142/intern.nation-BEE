const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  stipend: String,
  skills: [String],
  description: String,
  postedBy: String
});

module.exports = mongoose.model("Internship", internshipSchema);