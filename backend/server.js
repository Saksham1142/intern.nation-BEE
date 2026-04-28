const loadEnv = require("./config/loadEnv");
loadEnv();

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

// ✅ Import socket handler (clean structure)
const socketHandler = require("./sockets/sockets");

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // change this to frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Make io available everywhere (controllers/routes)
app.set("io", io);

// Initialize socket logic
socketHandler(io);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });