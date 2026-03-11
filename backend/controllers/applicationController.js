const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");

const applicationsFile = path.join(__dirname, "../data/applications.json");


// APPLY FOR INTERNSHIP
exports.applyInternship = (req, res) => {

  const applications = readData(applicationsFile);

  const {
    studentName,
    email,
    phone,
    year,
    department,
    cgpa,
    resume,
    coverLetter,
    internshipId
  } = req.body;

  const application = {
    id: Date.now(),
    studentName,
    email,
    phone,
    year,
    department,
    cgpa,
    resume,
    coverLetter,
    internshipId,
    status: "Applied"
  };

  applications.push(application);

  writeData(applicationsFile, applications);

  res.json({
    message: "Application submitted successfully"
  });

};


// GET ALL APPLICATIONS
exports.getApplications = (req, res) => {

  const applications = readData(applicationsFile);

  res.json(applications);

};