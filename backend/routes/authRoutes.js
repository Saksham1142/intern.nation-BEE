const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  updateUser
} = require("../controllers/authController");

// ========================
// AUTH ROUTES
// ========================

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// ========================
// UPDATE USER BY ID
// ========================
// PUT /user/:id
router.put("/user/:id", updateUser);

// ========================
// LOGOUT ROUTE
// ========================
router.get("/logout", (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Logout failed"
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax"
    });

    res.json({
      message: "Logged out successfully"
    });
  });

});

module.exports = router;