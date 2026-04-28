const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // load all JSON files
    const applications = JSON.parse(fs.readFileSync("./data/applications.json", "utf-8"));
    const data = JSON.parse(fs.readFileSync("./data/datas.json", "utf-8"));
    const internships = JSON.parse(fs.readFileSync("./data/internships.json", "utf-8"));
    const jobs = JSON.parse(fs.readFileSync("./data/jobs.json", "utf-8"));
    const settings = JSON.parse(fs.readFileSync("./data/settings.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

    // flexible schemas
    const Application = mongoose.model("Application", new mongoose.Schema({}, { strict: false }));
    const Data = mongoose.model("Data", new mongoose.Schema({}, { strict: false }));
    const Internship = mongoose.model("Internship", new mongoose.Schema({}, { strict: false }));
    const Job = mongoose.model("Job", new mongoose.Schema({}, { strict: false }));
    const Setting = mongoose.model("Setting", new mongoose.Schema({}, { strict: false }));
    const User = mongoose.model("User", new mongoose.Schema({}, { strict: false }));

    // clear old data
    await Application.deleteMany();
    await Data.deleteMany();
    await Internship.deleteMany();
    await Job.deleteMany();
    await Setting.deleteMany();
    await User.deleteMany();

    // insert new data
    await Application.insertMany(applications);
    await Data.insertMany(data);
    await Internship.insertMany(internships);
    await Job.insertMany(jobs);
    await Setting.insertMany(settings);
    await User.insertMany(users);

    console.log("✅ All data imported successfully");
    process.exit();
  })
  .catch(err => {
    console.log("❌ Error:", err);
  });