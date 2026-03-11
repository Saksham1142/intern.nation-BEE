module.exports = (req, res, next) => {
  console.log(`${req.method} request received for ${req.url}`);
  next();
};