const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentName: String,
  email: String,
  internshipId: String,
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Application", applicationSchema);