const defaultApplicants = [
  { id: 101, name: "Aarav Sharma", role: "Software Intern", status: "Pending", email: "aarav@example.com" },
  { id: 102, name: "Priya Singh", role: "HR Coordinator", status: "Selected", email: "priya@example.com" },
  { id: 103, name: "Rohan Mehta", role: "Web Developer", status: "Rejected", email: "rohan@example.com" },
  { id: 104, name: "Reva Kapoor", role: "Marketing Intern", status: "Selected", email: "reva@example.com" },
  { id: 105, name: "Karan Patel", role: "Finance Analyst", status: "Pending", email: "karan@example.com" }
];


if (!localStorage.getItem("applicants")) {
  localStorage.setItem("applicants", JSON.stringify(defaultApplicants));
}


const applicantList = document.getElementById("applicantList");
const toast = document.getElementById("toast");

function renderApplicants() {
  const applicants = JSON.parse(localStorage.getItem("applicants"));
  applicantList.innerHTML = "";

  applicants.forEach((a, index) => {
    const card = document.createElement("div");
    card.className = "applicant-card";
    card.innerHTML = `
      <h3>${a.name}</h3>
      <p><strong>Role:</strong> ${a.role}</p>
      <p><strong>Email:</strong> ${a.email}</p>

      <select class="status-dropdown ${a.status}" data-index="${index}">
        <option value="Pending" ${a.status === "Pending" ? "selected" : ""}>Pending</option>
        <option value="Selected" ${a.status === "Selected" ? "selected" : ""}>Selected</option>
        <option value="Rejected" ${a.status === "Rejected" ? "selected" : ""}>Rejected</option>
      </select>

      <button class="email-btn" data-email="${a.email}">📧 Send Mail</button>
    `;

    applicantList.appendChild(card);
  });

  
  document.querySelectorAll(".status-dropdown").forEach(drop => {
    drop.addEventListener("change", e => {
      const idx = e.target.dataset.index;
      const applicants = JSON.parse(localStorage.getItem("applicants"));
      applicants[idx].status = e.target.value;
      localStorage.setItem("applicants", JSON.stringify(applicants));

     
      e.target.className = `status-dropdown ${e.target.value}`;
    });
  });

  document.querySelectorAll(".email-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const email = e.target.dataset.email;
      alert(`Notification sent to ${email}`);
    });
  });
}

renderApplicants();


document.getElementById("sendNotifications").addEventListener("click", () => {
  const applicants = JSON.parse(localStorage.getItem("applicants"));
  console.log("Notifications sent to all applicants:", applicants);
  showToast();
});


function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
