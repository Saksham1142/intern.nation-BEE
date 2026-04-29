const user = JSON.parse(localStorage.getItem("userInfo"));

if (!user) {
  alert("Please login first");
  window.location.href = "../login.html";
}

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (!userInfo || userInfo.role !== 'student') {
  window.location.href = '../login.html';
}

