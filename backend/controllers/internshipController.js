const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");

const internshipsFile = path.join(__dirname, "../data/internships.json");

exports.postInternship = (req, res) => {

  const internships = readData(internshipsFile);

  const { title, company, location, stipend } = req.body;

  const job = {
    id: Date.now(),
    title,
    company,
    location,
    stipend
  };

  internships.push(job);

  writeData(internshipsFile, internships);

  res.json({
    message: "Internship posted successfully"
  });

};

exports.getInternships = (req, res) => {

  const internships = readData(internshipsFile);

  res.json(internships);

};