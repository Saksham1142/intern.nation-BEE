const express = require("express");
const router = express.Router();

const { streamStaticPage } = require("../controllers/pageController");

router.get("/stream-page/:pageName", streamStaticPage);

module.exports = router;
