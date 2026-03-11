module.exports = (req, res, next) => {
  console.log(
    `${new Date().toISOString()} | ${req.method} request received for ${req.url}`
  );
  next();
};
