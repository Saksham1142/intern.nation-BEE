function handleForgotPassword(event) {
  event.preventDefault();
  
  const form = event.target;
  const email = form.querySelector('input[name="email"]').value;
  const role = form.querySelector('select[name="role"]').value;
  
  if (!email || !role) {
    alert('Please fill in all fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert(`Password reset link sent to ${email} for ${role} account.`);
  
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
}

document.querySelectorAll('input[required], select[required]').forEach(input => {
  input.addEventListener('input', function() {
    if (this.value.trim()) {
      this.style.borderColor = '#ccc';
    }
  });
});
