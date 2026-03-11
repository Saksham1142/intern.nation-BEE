const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../data/settings.json");
const dataPath = path.join(__dirname, "../data/data.json");


// ============================
// GET SETTINGS
// ============================

exports.getSettings = (req, res) => {

  fs.readFile(settingsPath, "utf8", (err, data) => {

    if (err) {
      return res.status(500).json({ error: "Cannot read settings file" });
    }

    res.json(JSON.parse(data));

  });

};


// ============================
// UPDATE SETTINGS
// ============================

exports.updateSettings = (req, res) => {

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

};


// ============================
// GET DASHBOARD DATA
// ============================

exports.getDashboardData = (req, res) => {

  fs.readFile(dataPath, "utf8", (err, data) => {

    if (err) {
      return res.status(500).json({ error: "Cannot read data file" });
    }

    res.json(JSON.parse(data));

  });

};


// ============================
// UPDATE STATUS
// ============================

exports.updateStatus = (req, res) => {

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

};