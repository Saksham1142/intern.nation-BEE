const path = require("path");
const { readData, writeData } = require("../utils/fileUtils");
const AppError = require("../utils/AppError");

const settingsPath = path.join(__dirname, "../data/settings.json");
const dataPath = path.join(__dirname, "../data/data.json");


// ============================
// GET SETTINGS
// ============================

exports.getSettings = (req, res, next) => {
  try {
    const settings = readData(settingsPath, {});
    res.json(settings);
  } catch (error) {
    next(new AppError("Cannot read settings file", 500));
  }
};


// ============================
// UPDATE SETTINGS
// ============================

exports.updateSettings = (req, res, next) => {
  try {
    writeData(settingsPath, req.body);
    res.json({ message: "Settings updated successfully" });
  } catch (error) {
    next(new AppError("Cannot save settings", 500));
  }
};


// ============================
// GET DASHBOARD DATA
// ============================

exports.getDashboardData = (req, res, next) => {
  try {
    const dashboardData = readData(dataPath, {});
    res.json(dashboardData);
  } catch (error) {
    next(new AppError("Cannot read data file", 500));
  }
};


// ============================
// UPDATE STATUS
// ============================

exports.updateStatus = (req, res, next) => {
  try {
    const { entity, id, status } = req.body;
    const data = readData(dataPath, {});
    const key = `${entity}s`;

    if (!entity || !id || !status) {
      throw new AppError("Entity, id, and status are required", 400);
    }

    if (!data[key]) {
      throw new AppError("Invalid entity type", 400);
    }

    const index = data[key].findIndex(item => item.id === Number(id));

    if (index === -1) {
      throw new AppError("Item not found", 404);
    }

    data[key][index].status = status;

    writeData(dataPath, data);

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    next(error);
  }
};
