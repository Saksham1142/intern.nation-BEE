const Application = require("../models/Application");

// APPLY
exports.applyInternship = async (req, res, next) => {
  try {
    const { studentName, email, internshipId } = req.body;

    const app = new Application({
      studentName,
      email,
      internshipId
    });

    await app.save();

    res.json({ message: "Applied successfully" });

  } catch (err) {
    next(err);
  }
};

// VIEW
exports.getApplications = async (req, res, next) => {
  try {
    const apps = await Application.find();
    res.json(apps);
  } catch (err) {
    next(err);
  }
};