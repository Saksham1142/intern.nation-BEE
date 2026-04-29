function setupLogout() {

  const logoutBtn = document.getElementById("confirmLogout");

  if (!logoutBtn) {
    console.log("Logout button not found");
    return;
  }

  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/logout", {
        method: "GET",
        credentials: "include"
      });

      localStorage.removeItem("userInfo");

      alert("Logged out successfully");

      window.location.href = "../login.html";

    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
  });

}