const express = require("express");
const router = express.Router();

const {
  getSettings,
  updateSettings,
  getDashboardData,
  updateStatus
} = require("../controllers/settingsController");

// ==========================
// SETTINGS ROUTES
// ==========================

// Get settings
router.get("/settings", getSettings);

// Update settings
router.put("/settings", updateSettings);

// ==========================
// DASHBOARD DATA
// ==========================

// Get dashboard data
router.get("/data", getDashboardData);

// ==========================
// UPDATE STATUS
// ==========================

router.patch("/update-status", updateStatus);

module.exports = router;