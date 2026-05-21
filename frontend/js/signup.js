// =========================
// ROLE TAB SWITCHING
// =========================

// role tabs
const studentTab = document.getElementById("student-tab");
const companyTab = document.getElementById("company-tab");

// forms
const studentForm = document.getElementById("student");
const companyForm = document.getElementById("company");


// function to switch forms
function showForm(role){

  // remove active class from all
  studentForm.classList.remove("active");
  companyForm.classList.remove("active");

  // activate selected form
  if(role === "student"){
    studentForm.classList.add("active");
  }

  if(role === "company"){
    companyForm.classList.add("active");
  }

}


// default form
showForm("student");


// tab switching
studentTab.addEventListener("change", () => showForm("student"));
companyTab.addEventListener("change", () => showForm("company"));



// =========================
// SIGNUP LOGIC
// =========================

document.querySelectorAll(".form").forEach(form => {

  form.addEventListener("submit", async function(e){

    e.preventDefault();

    // current role = form id
    const role = this.id;

    // collect all form data
    const formData = new FormData(this);

    // convert form data to normal object
    const data = Object.fromEntries(formData.entries());

    // adding role manually
    data.role = role;

    console.log(data);

    try{

      // using relative route because deployed frontend
      // and backend are running together
      const res = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      // if signup fails
      if(!res.ok){
        alert(result.message);
        return;
      }

      // success message
      alert("Account created successfully!");

      // redirect to login page
      window.location.href = "login.html";

    }
    catch(err){

      console.error(err);
      alert("Signup failed");

    }

  });

});