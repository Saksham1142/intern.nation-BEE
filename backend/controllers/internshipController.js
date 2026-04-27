const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");

const internshipsFile = path.join(__dirname, "../data/internships.json");

exports.postInternship = (req, res) => {

  const internships = readData(internshipsFile);

  const {
    postType,
    jobTitle,
    department,
    locationType,
    openings,
    salary,
    duration,
    description,
    skills,
    deadline
  } = req.body;

  let skillsArray = [];

  if (typeof skills === "string") {
    skillsArray = skills.split(",").map(s => s.trim());
  } else if (Array.isArray(skills)) {
    skillsArray = skills;
  }

  const newInternship = {
    id: Date.now(),
    title: jobTitle,
    company: "Company User",
    location: locationType,
    stipend: salary,
    type: postType,
    department,
    openings,
    description,
    skills: skillsArray,
    deadline,
    duration
  };

  internships.push(newInternship);

  writeData(internshipsFile, internships);

  res.json({
    message: "Internship posted successfully"
  });
};