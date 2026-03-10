document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const updateBtn = document.getElementById("updateBtn");
  const profileList = document.getElementById("profile-info-list");
  
  
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");

  let editing = false;

  function loadProfile() {
    
    profileName.textContent = userInfo.name || "N/A";
    profileEmail.textContent = userInfo.email || "N/A";

    
    profileList.innerHTML = `
      <li><strong>Student ID:</strong> ${userInfo.studentId || "N/A"}</li>
      <li><strong>Name:</strong> ${userInfo.name || "N/A"}</li>
      <li><strong>Email:</strong> ${userInfo.email || "N/A"}</li>
      <li><strong>Phone:</strong> ${userInfo.phone || "N/A"}</li>
      <li><strong>Department:</strong> ${userInfo.department || "N/A"}</li>
      <li><strong>Year of Study:</strong> ${userInfo.year || "N/A"}</li>
      <li><strong>CGPA:</strong> ${userInfo.cgpa || "N/A"}</li>
      <li><strong>Resume:</strong> ${
        userInfo.resume
          ? `<a href="${userInfo.resume}" target="_blank">View Resume</a>`
          : `<a href="#">No Resume Uploaded</a>`
      }</li>
    `;
  }

  loadProfile();

  if (updateBtn) {
    updateBtn.addEventListener("click", () => {
      if (editing) return;
      editing = true;
      updateBtn.style.display = "none";
      
      
      const lis = profileList.querySelectorAll("li");
      
      const yearLi = lis[5];
      const cgpaLi = lis[6];
      const resumeLi = lis[7];

      const currentYear = userInfo.year || "";
      const currentCgpa = userInfo.cgpa || "";

      yearLi.innerHTML = `
        <strong>Year of Study:</strong>
        <select id="yearInput">
          <option value="" disabled>Select Year</option>
          <option value="1st Year" ${currentYear === "1st Year" ? "selected" : ""}>1st Year</option>
          <option value="2nd Year" ${currentYear === "2nd Year" ? "selected" : ""}>2nd Year</option>
          <option value="3rd Year" ${currentYear === "3rd Year" ? "selected" : ""}>3rd Year</option>
          <option value="4th Year" ${currentYear === "4th Year" ? "selected" : ""}>4th Year</option>
        </select>
      `;

      cgpaLi.innerHTML = `
        <strong>CGPA:</strong>
        <input type="number" id="cgpaInput" min="0" max="10" step="0.01" value="${currentCgpa}" placeholder="Enter CGPA">
      `;

      resumeLi.innerHTML = `
        <strong>Resume:</strong>
        <input type="file" id="resumeInput" accept=".pdf,.doc,.docx">
      `;

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("edit-btn-container");
      btnContainer.innerHTML = `
        <button id="saveBtn" class="save-btn">Save Details</button>
        <button id="cancelBtn" class="cancel-btn">Cancel</button>
      `;
      
      profileList.closest('.profile-card').appendChild(btnContainer);

      document.getElementById("cancelBtn").addEventListener("click", () => {
        btnContainer.remove();
        editing = false;
        updateBtn.style.display = "inline-block";
        loadProfile(); 
      });

      document.getElementById("saveBtn").addEventListener("click", () => {
        const newYear = document.getElementById("yearInput").value;
        const newCgpa = document.getElementById("cgpaInput").value;
        const resumeFile = document.getElementById("resumeInput").files[0];

        
        if (newYear) userInfo.year = newYear;
        if (newCgpa) userInfo.cgpa = newCgpa;
        if (resumeFile) {
          
          const fileURL = URL.createObjectURL(resumeFile);
          userInfo.resume = fileURL;
        }

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("Details updated successfully!");

        btnContainer.remove();
        editing = false;
        updateBtn.style.display = "inline-block";
        loadProfile(); 
      });
    });
  } else {
    console.error("Error: The 'Update Details' button with ID 'updateBtn' was not found.");
  }
});


const logoutLink = document.createElement('li');
logoutLink.innerHTML = '<a href="#" id="logout">Logout</a>';
document.querySelector('.main-nav ul').appendChild(logoutLink);
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('userInfo');
  window.location.href = '../login.html';
});
