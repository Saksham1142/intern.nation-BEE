const express = require("express");
const router = express.Router();

const { postInternship } = require("../controllers/internshipController");

router.post("/post-internship", postInternship);

module.exports = router;