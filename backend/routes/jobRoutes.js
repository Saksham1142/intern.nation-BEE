const express = require("express");
const router = express.Router();
const { getAllJobs, getJobById } = require("../controllers/jobController");

router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobById);

module.exports = router;