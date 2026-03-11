document.getElementById("jobApplicationForm").addEventListener("submit", async function(e) {

  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const year = document.getElementById("year").value;
  const department = document.getElementById("department").value;
  const cgpa = document.getElementById("cgpa").value;
  const coverLetter = document.getElementById("coverLetter").value;

  const resume = document.getElementById("resume").files[0]?.name || "";

  const params = new URLSearchParams(window.location.search);
  const internshipId = params.get("id") || 1;

  const data = {
    studentName: fullName,
    email,
    phone,
    year,
    department,
    cgpa,
    resume,
    coverLetter,
    internshipId
  };

  try {

    const response = await fetch("http://localhost:5000/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    alert(result.message);

    window.location.href = "student_dashboard.html";

  } catch (error) {

    console.error(error);
    alert("Application failed");

  }

});