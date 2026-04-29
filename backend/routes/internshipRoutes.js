const express = require("express");
const router = express.Router();

const {
  postInternship,
  getInternships
} = require("../controllers/internshipController");

// POST internship (company)
router.post("/post-internship", postInternship);

// GET internships (student dashboard)
router.get("/internships", getInternships);

module.exports = router;