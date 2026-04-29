const Internship = require("../models/Internship");

// POST internship
exports.postInternship = async (req, res, next) => {
  try {
    const { title, company, location, stipend, skills, description } = req.body;

    const newInternship = new Internship({
      title,
      company,
      location,
      stipend,
      skills,
      description,
      postedBy: req.session?.user?.email || "unknown"
    });

    await newInternship.save();

    res.json({ message: "Internship posted" });

  } catch (err) {
    next(err);
  }
};

// GET internships
exports.getInternships = async (req, res, next) => {
  try {
    const data = await Internship.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
};