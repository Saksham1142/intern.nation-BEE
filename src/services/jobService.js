const Job = require("../models/Job");

exports.postJob = async (data) => {

  const job = new Job({
    ...data,
    createdAt: new Date()
  });

  await job.save();

  return job;
};

exports.getJobs = async () => {
  return await Job.find();
};