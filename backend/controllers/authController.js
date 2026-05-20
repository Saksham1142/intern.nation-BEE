const authService = require("../services/authService");

// ========================
// SIGNUP CONTROLLER
// ========================
exports.signup = async (req, res, next) => {
  try {

    const user = await authService.signupUser(req.body);

    res.json({
      message: "Account created successfully",
      userId: user.id,
      role: user.role
    });

  } catch (err) {
    next(err);
  }
};

// ========================
// LOGIN CONTROLLER
// ========================
exports.login = async (req, res, next) => {
  try {

    const { user, token } = await authService.loginUser(req.body);

    // SESSION
    req.session.user = {
      id: user.id,
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
      name: user.fullName,
      token
    });

  } catch (err) {
    next(err);
  }
};

// ========================
// UPDATE USER CONTROLLER
// ========================
exports.updateUser = async (req, res, next) => {
  try {

    const updatedUser = await authService.updateUserById(
      req.params.id,
      req.body
    );

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (err) {
    next(err);
  }
}