const express = require("express");
const path = require("path");
const router = express.Router();

// Serve pages if needed
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

module.exports = router;