const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

// AUTH
router.post("/signup", signup);
router.post("/login", login);

// LOGOUT
router.get("/logout", (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax"
    });

    res.json({ message: "Logged out successfully" });
  });

});
module.exports = router;