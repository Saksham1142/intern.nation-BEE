// =========================
// Role Form Switch
// =========================

const forms = document.querySelectorAll(".form");
const radios = document.querySelectorAll("input[name='role']");

function showForm(role) {

  forms.forEach(f => f.style.display = "none");

  document.getElementById(role).style.display = "block";

}

radios.forEach(radio => {

  radio.addEventListener("change", () => {

    if (radio.id === "student-tab") showForm("student");

    if (radio.id === "company-tab") showForm("company");

    if (radio.id === "admin-tab") showForm("admin");

  });

});

showForm("student");


// =========================
// LOGIN FUNCTION
// =========================

function processForm(id) {

  document.getElementById(id).addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {

      const res = await fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

      });

      const result = await res.json();

      if (!res.ok) {

        alert(result.message);

        return;

      }

      localStorage.setItem("userInfo", JSON.stringify(result));

      alert("Login successful");

      if (result.role === "student") {

        window.location.href = "student_dashboard/student_dashboard.html";

      }

      if (result.role === "company") {

        window.location.href = "company_dashboard/companydashboard.html";

      }

      if (result.role === "admin") {

        window.location.href = "admin_dashboard/Admin_Dashboard.html";

      }

    } catch (err) {

      console.error(err);

      alert("Login failed");

    }

  });

}


// activate forms

processForm("student");
processForm("company");
processForm("admin");


// =========================
// GOOGLE LOGIN
// =========================

function handleCredentialResponse(response) {

  try {

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

  catch (err) {

    console.error("Google Sign-in Error:", err);

    document.getElementById("google-error").style.display = "block";

  }

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