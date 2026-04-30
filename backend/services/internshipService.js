const Internship = require("../models/Internship");
const AppError = require("../utils/AppError");

exports.postInternship = async (data) => {

  if (!data.title || !data.company) {
    throw new AppError("Title & company required", 400);
  }

  const internship = new Internship({
    ...data,
    createdAt: new Date()
  });

  await internship.save();

  return internship;
};

exports.getInternships = async () => {
  return await Internship.find();
};