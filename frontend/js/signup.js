// =========================
// ROLE TAB SWITCHING
// =========================

const studentTab = document.getElementById("student-tab");
const companyTab = document.getElementById("company-tab");

const studentForm = document.getElementById("student");
const companyForm = document.getElementById("company");

function showForm(role){

  studentForm.classList.remove("active");
  companyForm.classList.remove("active");

  if(role === "student"){
    studentForm.classList.add("active");
  }

  if(role === "company"){
    companyForm.classList.add("active");
  }

}

// default form
showForm("student");

studentTab.addEventListener("change", () => showForm("student"));
companyTab.addEventListener("change", () => showForm("company"));



// =========================
// SIGNUP LOGIC
// =========================

document.querySelectorAll(".form").forEach(form => {

  form.addEventListener("submit", async function(e){

    e.preventDefault();

    const role = this.id;

    const formData = new FormData(this);

    const data = Object.fromEntries(formData.entries());

    data.role = role;

    try{

      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if(!res.ok){
        alert(result.message);
        return;
      }

      alert("Account created successfully!");

      window.location.href = "login.html";

    }
    catch(err){

      console.error(err);
      alert("Signup failed");

    }

  });

});