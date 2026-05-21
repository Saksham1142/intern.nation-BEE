const authService = require("../services/authService");

// SIGNUP
exports.signup = async (req, res, next) => {
  try {

    const user = await authService.signupUser(req.body);

    res.json({
      message: "Account created successfully",
      role: user.role
    });

  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {

    const { user, token } = await authService.loginUser(req.body);

    // SESSION
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    // COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    res.json({
      message: "Login successful",
      role: user.role,
      name: user.companyName || user.name
    });

  } catch (err) {
    next(err);
  }
};