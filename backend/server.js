const loadEnv = require("./config/loadEnv");
loadEnv();

const mongoose = require("mongoose"); // ✅ add this
const app = require("./app");

const PORT = process.env.PORT || 5000;

// ✅ connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // start server ONLY after DB connects
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });