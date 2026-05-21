const path = require("path");
const { createFileReadStream } = require("../utils/fileUtils");
const AppError = require("../utils/AppError");

const pagesDirectory = path.join(__dirname, "../../frontend");
const allowedPages = {
  home: "index.html",
  about: "about.html",
  privacy: "privacy.html",
  terms: "terms.html",
  contact: "contactus.html"
};

exports.streamStaticPage = (req, res, next) => {
  try {
    const pageName = req.params.pageName;
    const pageFile = allowedPages[pageName];

    if (!pageFile) {
      throw new AppError("Page stream not available for the requested page", 404);
    }

    const filePath = path.join(pagesDirectory, pageFile);
    const stream = createFileReadStream(filePath);

    stream.on("error", () => {
      next(new AppError("Unable to stream the requested page", 500));
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};
