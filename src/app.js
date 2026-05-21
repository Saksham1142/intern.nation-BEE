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

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// SESSION
app.use(
  session({
    secret: "internnationsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(logger);

// static files

app.use(express.static(path.join(__dirname, "../frontend")));

// routes
app.use("/", authRoutes);
app.use("/", internshipRoutes);
app.use("/", applicationRoutes);
app.use("/", pageRoutes);
app.use("/api", settingsRoutes);

// error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;