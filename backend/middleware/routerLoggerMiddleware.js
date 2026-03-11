module.exports = (routerName) => (req, res, next) => {
  console.log(`[${routerName}] ${req.method} ${req.originalUrl}`);
  next();
};
