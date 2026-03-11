const express = require("express");
const cors = require("cors");
const path = require("path");

const logger = require("./middleware/loggerMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const pageRoutes = require("./routes/pageRoutes");
const notFoundHandler = require("./middleware/notFoundMiddleware");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// routes
app.use("/", authRoutes);
app.use("/", internshipRoutes);
app.use("/", applicationRoutes);
app.use("/", pageRoutes);
app.use("/api", settingsRoutes);

app.use(notFoundHandler);

// error middleware
app.use(errorHandler);

module.exports = app;
