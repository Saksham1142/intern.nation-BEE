const socket = io("http://localhost:5000");

// connection test
socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

/* =========================
REAL-TIME EVENTS
========================= */

// 🔔 notification receiver
socket.on("notification:receive", (data) => {
  console.log("🔔 Notification:", data.message);
  alert(data.message);
});

// 👥 user status update listener
socket.on("user_status_changed", (data) => {
  console.log("User status changed:", data);

  // refresh table automatically
  if (typeof loadUsers === "function") {
    loadUsers();
  }
});