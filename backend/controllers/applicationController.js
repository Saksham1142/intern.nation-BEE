const applicationService = require("../services/applicationService");

exports.applyInternship = async (req, res, next) => {
  try {
    const result = await applicationService.applyInternship(req.body);

    res.json({
      message: "Application submitted",
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.getApplications = async (req, res, next) => {
  try {
    const data = await applicationService.getApplications();

    res.json(data);

  } catch (err) {
    next(err);
  }
};