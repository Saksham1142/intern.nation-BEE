// =========================
// Role Switch
// =========================

const forms = document.querySelectorAll(".form");
const radios = document.querySelectorAll("input[name='role']");

function showForm(role) {
  forms.forEach(f => f.classList.remove("active"));
  document.getElementById(role).classList.add("active");
}

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.id === "student-tab") showForm("student");
    if (radio.id === "company-tab") showForm("company");
  });
});

showForm("student");


// =========================
// STUDENT SIGNUP
// =========================

document.getElementById("student").addEventListener("submit", async function (e) {

  e.preventDefault();

  const formData = new FormData(e.target);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    studentId: formData.get("studentId"),
    college: formData.get("college"),
    department: formData.get("department"),
    role: "student"
  };

  try {

    const res = await fetch("http://localhost:5000/signup", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)

    });

    const result = await res.json();

    alert(result.message);

    if (res.ok) {
      window.location.href = "../login.html";
    }

  } catch (err) {

    console.error(err);

    alert("Signup failed");

  }

});


// =========================
// COMPANY SIGNUP
// =========================

document.getElementById("company").addEventListener("submit", async function (e) {

  e.preventDefault();

  const formData = new FormData(e.target);

  const data = {
    name: formData.get("companyName"),
    email: formData.get("email"),
    password: formData.get("password"),
    companyName: formData.get("companyName"),
    industry: formData.get("industry"),
    location: formData.get("location"),
    role: "company"
  };

  try {

    const res = await fetch("http://localhost:5000/signup", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)

    });

    const result = await res.json();

    alert(result.message);

    if (res.ok) {
      window.location.href = "../login.html";
    }

  } catch (err) {

    console.error(err);

    alert("Signup failed");

  }

});


// =========================
// GOOGLE SIGNUP
// =========================

function handleCredentialResponse(response) {

  const payload = decodeJwt(response.credential);

  const userInfo = {
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
    id: payload.sub,
    authProvider: "google"
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  window.location.href = "student_dashboard/student_dashboard.html";

}


// =========================
// JWT Decode
// =========================

function decodeJwt(token) {

  const base64Url = token.split('.')[1];

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);

}