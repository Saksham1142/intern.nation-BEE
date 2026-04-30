const jobService = require("../services/jobService");

exports.postJob = async (req, res, next) => {
  try {
    const result = await jobService.postJob(req.body);

    res.json({
      message: "Job posted",
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    const data = await jobService.getJobs();

    res.json(data);

  } catch (err) {
    next(err);
  }
};