const fs = require("fs");

function readData(file, fallback = []) {
  if (!fs.existsSync(file)) {
    return fallback;
  }

  const data = fs.readFileSync(file, "utf8").trim();

  if (!data) {
    return fallback;
  }

  return JSON.parse(data);
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function createFileReadStream(file, options = {}) {
  return fs.createReadStream(file, options);
}

module.exports = { readData, writeData, createFileReadStream };
