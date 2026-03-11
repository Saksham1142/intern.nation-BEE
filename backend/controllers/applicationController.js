const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");
const AppError = require("../utils/AppError");

const applicationsFile = path.join(__dirname, "../data/applications.json");
const internshipsFile = path.join(__dirname, "../data/internships.json");


// APPLY FOR INTERNSHIP
exports.applyInternship = (req, res, next) => {
  try {
    const applications = readData(applicationsFile);
    const internships = readData(internshipsFile);
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

    if (!studentName || !email || !phone || !year || !department || !cgpa || !internshipId) {
      throw new AppError("All required application fields must be filled", 400);
    }

    const normalizedInternshipId = Number(internshipId);
    const internship = internships.find((item) => item.id === normalizedInternshipId);

    if (!internship) {
      throw new AppError("Selected opportunity does not exist", 404);
    }

    const duplicateApplication = applications.find(
      (item) => item.email === email && Number(item.internshipId) === normalizedInternshipId
    );

    if (duplicateApplication) {
      throw new AppError("You have already applied for this opportunity", 409);
    }

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
      internshipId: normalizedInternshipId,
      company: internship.company,
      position: internship.title,
      status: "Applied",
      appliedAt: new Date().toISOString()
    };

    applications.push(application);

    writeData(applicationsFile, applications);

    res.status(201).json({
      message: "Application submitted successfully",
      data: application
    });
  } catch (error) {
    next(error);
  }
};


// GET ALL APPLICATIONS
exports.getApplications = (req, res, next) => {
  try {
    const applications = readData(applicationsFile);
    const { email } = req.query;

    const filteredApplications = email
      ? applications.filter((application) => application.email === email)
      : applications;

    res.json(filteredApplications);
  } catch (error) {
    next(error);
  }
};

exports.deleteApplication = (req, res, next) => {
  try {
    const applications = readData(applicationsFile);
    const applicationId = Number(req.params.id);
    const applicationIndex = applications.findIndex(
      (application) => application.id === applicationId
    );

    if (applicationIndex === -1) {
      throw new AppError("Application not found", 404);
    }

    const [deletedApplication] = applications.splice(applicationIndex, 1);

    writeData(applicationsFile, applications);

    res.json({
      message: "Application withdrawn successfully",
      data: deletedApplication
    });
  } catch (error) {
    next(error);
  }
};
