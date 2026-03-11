document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const tableBody = document.querySelector(".applications-table tbody");

  if (!userInfo || userInfo.role !== "student") {
    window.location.href = "../login.html";
    return;
  }

  async function loadApplications() {
    try {
      const response = await fetch(
        `http://localhost:5000/applications?email=${encodeURIComponent(userInfo.email)}`
      );
      const applications = await response.json();

      if (!response.ok) {
        alert("Unable to load applications");
        return;
      }

      if (!applications.length) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="4">No applications submitted yet.</td>
          </tr>
        `;
        return;
      }

      tableBody.innerHTML = applications.map((application) => `
        <tr data-application-id="${application.id}">
          <td>${application.company}</td>
          <td>${application.position}</td>
          <td><span class="status applied">${application.status}</span></td>
          <td>
            <button class="btn view-btn">View</button>
            <button class="btn withdraw-btn">Withdraw</button>
          </td>
        </tr>
      `).join("");
    } catch (error) {
      console.error(error);
      alert("Unable to load applications");
    }
  }

  tableBody.addEventListener("click", async (event) => {
    const row = event.target.closest("tr");

    if (!row) {
      return;
    }

    const applicationId = row.dataset.applicationId;
    const company = row.querySelector("td:nth-child(1)")?.textContent;
    const position = row.querySelector("td:nth-child(2)")?.textContent;

    if (event.target.classList.contains("view-btn")) {
      alert(`Application for ${position} at ${company}`);
      return;
    }

    if (!event.target.classList.contains("withdraw-btn")) {
      return;
    }

    const confirmWithdraw = confirm(
      `Are you sure you want to withdraw your application from ${company}?`
    );

    if (!confirmWithdraw) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/applications/${applicationId}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      await loadApplications();
    } catch (error) {
      console.error(error);
      alert("Unable to withdraw the application");
    }
  });

  loadApplications();
});
