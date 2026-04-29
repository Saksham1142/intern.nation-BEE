const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const logger = require("./middleware/loggerMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const pageRoutes = require("./routes/pageRoutes");
const notFoundHandler = require("./middleware/notFoundMiddleware");

const app = express();

// =========================
// MIDDLEWARE
// =========================

// 🔥 CORS FIX (important for frontend fetch)
app.use(
  cors({
    origin: "http://localhost:3000", // change if your frontend runs on different port
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// 🔥 SESSION
app.use(
  session({
    secret: "internnationsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// 🔥 LOGGER (request flow)
app.use(logger);

// =========================
// SERVE FRONTEND
// =========================

app.use(express.static(path.join(__dirname, "../frontend")));

// =========================
// ROUTES
// =========================

app.use("/", authRoutes);
app.use("/", internshipRoutes);
app.use("/", applicationRoutes);
app.use("/", pageRoutes);
app.use("/api", settingsRoutes);

// =========================
// NOT FOUND + ERROR
// =========================

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;