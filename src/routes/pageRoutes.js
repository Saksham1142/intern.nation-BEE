const express = require("express");
const path = require("path");
const router = express.Router();

const Internship = require("../models/Internship");

// =========================
// HOME PAGE (STATIC)
// =========================
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// =========================
// 🔥 STUDENT DASHBOARD (EJS)
// =========================
router.get("/student-dashboard", async (req, res) => {

  // 🔐 PROTECT ROUTE (SESSION CHECK)
  if (!req.session.user) {
    return res.redirect("/login.html");
  }

  try {
    const internships = await Internship.find();

    res.render("student_dashboard", {
      user: req.session.user,
      internships
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
});

module.exports = router;