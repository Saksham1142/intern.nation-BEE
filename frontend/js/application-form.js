document.getElementById("jobApplicationForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop form from refreshing the page
  alert("Application Form submitted successfully!");
  window.location.href = "student_dashboard.html"; // redirect after alert
});
