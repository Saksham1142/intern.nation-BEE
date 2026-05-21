const express = require("express");
const router = express.Router();

router.get("/settings", (req, res) => {
  res.send("Settings route working");
});

module.exports = router;