const fs = require("fs");
const path = require("path");

const jobsFile = path.join(__dirname, "../data/jobs.json");

// get all jobs
exports.getAllJobs = (req, res) => {

    try {

        const data = fs.readFileSync(jobsFile);
        const jobs = JSON.parse(data);

        res.json(jobs);

    } catch (error) {

        res.status(500).json({ message: "Error reading jobs data" });

    }

};


// get job by id
exports.getJobById = (req, res) => {

    try {

        const data = fs.readFileSync(jobsFile);
        const jobs = JSON.parse(data);

        const job = jobs.find(j => j.id === req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json(job);

    } catch (error) {

        res.status(500).json({ message: "Error fetching job" });

    }

};