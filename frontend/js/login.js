// ========================
// ROLE TAB SWITCHING
// ========================

const studentTab = document.getElementById("student-tab");
const adminTab = document.getElementById("admin-tab");
const companyTab = document.getElementById("company-tab");

const studentForm = document.getElementById("student");
const adminForm = document.getElementById("admin");
const companyForm = document.getElementById("company");

function showForm(role){

  studentForm.style.display = "none";
  adminForm.style.display = "none";
  companyForm.style.display = "none";

  if(role === "student") studentForm.style.display = "block";
  if(role === "admin") adminForm.style.display = "block";
  if(role === "company") companyForm.style.display = "block";

}

// default form
showForm("student");

studentTab.addEventListener("change", () => showForm("student"));
adminTab.addEventListener("change", () => showForm("admin"));
companyTab.addEventListener("change", () => showForm("company"));



// ========================
// LOGIN LOGIC
// ========================

document.querySelectorAll(".form").forEach(form => {

  form.addEventListener("submit", async function(e){

    e.preventDefault();

    const role = this.id;

    const email = this.querySelector('input[name="email"]').value.trim();
    const password = this.querySelector('input[name="password"]').value.trim();

    let data = {
      email,
      password,
      role
    };

    // add role-specific IDs

    if(role === "student"){
      data.studentId = this.querySelector('input[name="studentId"]').value.trim();
    }

    if(role === "company"){
      data.companyId = this.querySelector('input[name="companyId"]').value.trim();
    }

    if(role === "admin"){
      data.adminId = this.querySelector('input[name="adminId"]').value.trim();
    }

    try{

      const res = await fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });

      const result = await res.json();

      if(!res.ok){
        alert(result.message);
        return;
      }

      // ========================
      // STORE LOGIN SESSION
      // ========================

      localStorage.setItem("userInfo", JSON.stringify({
        name: result.name,
        email: email,
        role: result.role
      }));


      // ========================
      // REDIRECT BASED ON ROLE
      // ========================

      if(result.role === "student"){
        window.location.href = "student_dashboard/student_dashboard.html";
      }

      if(result.role === "company"){
        window.location.href = "company_dashboard/companydashboard.html";
      }

      if(result.role === "admin"){
        window.location.href = "admin_dashboard/Admin_Dashboard.html";
      }

    }
    catch(err){
      console.error(err);
      alert("Login failed");
    }

  });

});