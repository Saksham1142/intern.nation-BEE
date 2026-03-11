const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;


// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} request received for ${req.url}`);
  next();
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));


// =========================
// File Paths
// =========================

const usersFile = path.join(__dirname, "users.json");
const internshipsFile = path.join(__dirname, "internships.json");
const applicationsFile = path.join(__dirname, "applications.json");

const settingsPath = path.join(__dirname, "settings.json");
const dataPath = path.join(__dirname, "data.json");


// =========================
// Ensure JSON files exist
// =========================

function ensureFile(file) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]");
  }
}

ensureFile(usersFile);
ensureFile(internshipsFile);
ensureFile(applicationsFile);


// =========================
// Helper Functions
// =========================

function readData(file) {
  const data = fs.readFileSync(file, "utf8");
  return JSON.parse(data);
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}


// =====================================================
// SETTINGS API
// =====================================================

// GET SETTINGS
app.get("/api/settings", (req, res) => {

  fs.readFile(settingsPath, "utf8", (err, data) => {

    if (err) {
      return res.status(500).json({ error: "Cannot read settings file" });
    }

    res.json(JSON.parse(data));
  });

});

// UPDATE SETTINGS
app.put("/api/settings", (req, res) => {

  const newSettings = req.body;

  fs.writeFile(
    settingsPath,
    JSON.stringify(newSettings, null, 2),
    (err) => {

      if (err) {
        return res.status(500).json({ error: "Cannot save settings" });
      }

      res.json({ message: "Settings updated successfully" });
    }
  );

});


// =====================================================
// DASHBOARD DATA
// =====================================================

app.get("/api/data", (req, res) => {

  fs.readFile(dataPath, "utf8", (err, data) => {

    if (err) {
      return res.status(500).json({ error: "Cannot read data file" });
    }

    res.json(JSON.parse(data));
  });

});


// =====================================================
// UPDATE STATUS (FIXED)
// =====================================================

app.patch("/api/update-status", (req, res) => {

  const { entity, id, status } = req.body;

  fs.readFile(dataPath, "utf8", (err, rawData) => {

    if (err) {
      return res.status(500).json({ error: "Cannot read data file" });
    }

    let data = JSON.parse(rawData);

    const key = entity + "s";

    if (!data[key]) {
      return res.status(400).json({ error: "Invalid entity type" });
    }

    // FIX: convert id to number so it matches JSON ids
    const index = data[key].findIndex(item => item.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    data[key][index].status = status;

    fs.writeFile(
      dataPath,
      JSON.stringify(data, null, 2),
      (err) => {

        if (err) {
          return res.status(500).json({ error: "Cannot update data" });
        }

        res.json({ message: "Status updated successfully" });
      }
    );

  });

});


// =====================================================
// AUTHENTICATION
// =====================================================

// SIGNUP
app.post("/signup", (req, res) => {

  const users = readData(usersFile);

  const {
    name,
    email,
    password,
    role,
    studentId,
    college,
    department,
    companyName,
    industry,
    location
  } = req.body;

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role,
    studentId: studentId || null,
    college: college || null,
    department: department || null,
    companyName: companyName || null,
    industry: industry || null,
    location: location || null
  };

  users.push(newUser);

  writeData(usersFile, users);

  res.json({
    message: "User registered successfully",
    user: newUser
  });

});


// LOGIN
app.post("/login", (req, res) => {

  const users = readData(usersFile);

  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    role: user.role,
    name: user.name
  });

});


// =====================================================
// INTERNSHIPS
// =====================================================

// POST INTERNSHIP
app.post("/post-internship", (req, res) => {

  const internships = readData(internshipsFile);

  const { title, company, location, stipend } = req.body;

  const job = {
    id: Date.now(),
    title,
    company,
    location,
    stipend
  };

  internships.push(job);

  writeData(internshipsFile, internships);

  res.json({
    message: "Internship posted successfully"
  });

});


// VIEW INTERNSHIPS
app.get("/internships", (req, res) => {

  const internships = readData(internshipsFile);

  res.json(internships);

});


// APPLY INTERNSHIP
app.post("/apply", (req, res) => {

  const applications = readData(applicationsFile);

  const { studentName, email, internshipId } = req.body;

  const application = {
    id: Date.now(),
    studentName,
    email,
    internshipId
  };

  applications.push(application);

  writeData(applicationsFile, applications);

  res.json({
    message: "Application submitted successfully"
  });

});


// VIEW APPLICATIONS
app.get("/applications", (req, res) => {

  const applications = readData(applicationsFile);

  res.json(applications);

});


// =====================================================
// ERROR HANDLING
// =====================================================

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong"
  });

});


// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});