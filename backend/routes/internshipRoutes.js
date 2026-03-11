const express = require("express");
const router = express.Router();

const {
  postInternship,
  getInternships
} = require("../controllers/internshipController");

router.post("/post-internship", postInternship);
router.get("/internships", getInternships);

module.exports = router;