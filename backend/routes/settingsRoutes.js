const express = require("express");
const router = express.Router();

const {
  getSettings,
  updateSettings,
  getDashboardData,
  updateStatus
} = require("../controllers/settingsController");



// Get settings
router.get("/settings", getSettings);

// Update settings
router.put("/settings", updateSettings);


// Get dashboard data
router.get("/data", getDashboardData);

router.patch("/update-status", updateStatus);

module.exports = router;