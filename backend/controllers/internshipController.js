const internshipService = require("../services/internshipService");

exports.postInternship = async (req, res, next) => {
  try {
    const result = await internshipService.postInternship(req.body);

    res.json({
      message: "Internship posted",
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.getInternships = async (req, res, next) => {
  try {
    const data = await internshipService.getInternships();

    res.json(data);

  } catch (err) {
    next(err);
  }
};