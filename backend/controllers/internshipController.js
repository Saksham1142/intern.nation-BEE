const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");
const AppError = require("../utils/AppError");

const internshipsFile = path.join(__dirname, "../data/internships.json");

exports.postInternship = (req, res, next) => {
  try {
    const internships = readData(internshipsFile);
    const {
      title,
      company,
      location,
      stipend,
      type = "Internship",
      department = "",
      openings = 1,
      description = "",
      skills = [],
      deadline = "",
      duration = ""
    } = req.body;

    if (!title || !company || !location || !stipend) {
      throw new AppError("Title, company, location, and stipend/salary are required", 400);
    }

    const job = {
      id: Date.now(),
      title,
      company,
      location,
      stipend,
      type,
      department,
      openings: Number(openings),
      description,
      skills: Array.isArray(skills) ? skills : [],
      deadline,
      duration
    };

    internships.push(job);

    writeData(internshipsFile, internships);

    res.status(201).json({
      message: "Opportunity posted successfully",
      data: job
    });
  } catch (error) {
    next(error);
  }
};

exports.getInternships = (req, res, next) => {
  try {
    const internships = readData(internshipsFile);
    const { type, company } = req.query;

    const filteredInternships = internships.filter((internship) => {
      const matchesType = !type || internship.type.toLowerCase() === type.toLowerCase();
      const matchesCompany =
        !company || internship.company.toLowerCase().includes(company.toLowerCase());

      return matchesType && matchesCompany;
    });

    res.json(filteredInternships);
  } catch (error) {
    next(error);
  }
};

exports.getInternshipById = (req, res, next) => {
  try {
    const internships = readData(internshipsFile);
    const internshipId = Number(req.params.id);
    const internship = internships.find((item) => item.id === internshipId);

    if (!internship) {
      throw new AppError("Opportunity not found", 404);
    }

    res.json(internship);
  } catch (error) {
    next(error);
  }
};
