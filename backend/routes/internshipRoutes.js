const express = require("express");
const router = express.Router();
const routerLogger = require("../middleware/routerLoggerMiddleware");

const {
  postInternship,
  getInternships,
  getInternshipById
} = require("../controllers/internshipController");

router.use(
  ["/post-internship", "/internships", "/internships/:id"],
  routerLogger("internships")
);

router.post("/post-internship", postInternship);
router.get("/internships", getInternships);
router.get("/internships/:id", getInternshipById);

module.exports = router;
