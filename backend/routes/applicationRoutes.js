const express = require("express");
const router = express.Router();
const routerLogger = require("../middleware/routerLoggerMiddleware");

const {
  applyInternship,
  getApplications,
  deleteApplication
} = require("../controllers/applicationController");

router.use(
  ["/apply", "/applications", "/applications/:id"],
  routerLogger("applications")
);

router.post("/apply", applyInternship);
router.get("/applications", getApplications);
router.delete("/applications/:id", deleteApplication);

module.exports = router;
