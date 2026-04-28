
module.exports = (io) => {
  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // when admin updates user status
    socket.on("user_status_updated", (data) => {

      // 1. update table everywhere
      io.emit("user_status_changed", data);

      // 2. send notification
      io.emit("notification:receive", {
        message: `User ${data.id} is now ${data.status}`
      });

      // 3. send dashboard refresh trigger
      io.emit("dashboard:refresh");
    });

  });
};