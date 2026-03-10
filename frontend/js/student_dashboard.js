const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (!userInfo || userInfo.role !== 'student') {
  window.location.href = '../login.html';
}

// Add logout functionality
const logoutLink = document.createElement('li');
logoutLink.innerHTML = '<a href="#" id="logout">Logout</a>';
document.querySelector('.main-nav ul').appendChild(logoutLink);
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('userInfo');
  window.location.href = '../login.html';
});
