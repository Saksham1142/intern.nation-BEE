const express = require("express");
const router = express.Router();

const {
  applyInternship,
  getApplications
} = require("../controllers/applicationController");

// APPLY
router.post("/apply", applyInternship);

// VIEW applications
router.get("/applications", getApplications);

module.exports = router;