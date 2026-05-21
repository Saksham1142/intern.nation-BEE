const Application = require("../models/Application");
const AppError = require("../utils/AppError");

exports.applyInternship = async (data) => {

  if (!data.studentName || !data.email || !data.internshipId) {
    throw new AppError("All fields required", 400);
  }

  const newApp = new Application({
    ...data,
    createdAt: new Date()
  });

  await newApp.save();

  return newApp;
};

exports.getApplications = async () => {
  return await Application.find();
};