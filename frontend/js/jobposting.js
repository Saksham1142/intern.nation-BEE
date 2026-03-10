document.addEventListener('DOMContentLoaded', () => {
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || userInfo.role !== 'company') {
        window.location.href = 'login.html'; 
        return; 
    }


    const header = document.querySelector('header');
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Logout';
 
    logoutLink.style.cssText = 'position: absolute; top: 10px; right: 10px; color: white; text-decoration: none; font-weight: bold;';
    header.appendChild(logoutLink);
    
    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('userInfo');
        window.location.href = 'login.html';
    });

   
    const profileNameElement = document.getElementById("profileName");
    const profileEmailElement = document.getElementById("profileEmail");
    
    if (userInfo.name && profileNameElement) {
         profileNameElement.textContent = userInfo.name;
    }
    if (userInfo.email && profileEmailElement) {
        profileEmailElement.textContent = "Email: " + userInfo.email;
    }

    const jobPostForm = document.getElementById('jobPostForm');
    const postConfirmation = document.getElementById('postConfirmation');

    jobPostForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const postType = document.getElementById('postType').value;
        const jobTitle = document.getElementById('jobTitle').value.trim();
        const department = document.getElementById('department').value.trim();
        const locationType = document.getElementById('locationType').value;
        const openings = document.getElementById('openings').value;
        const description = document.getElementById('description').value.trim();
        const deadline = document.getElementById('deadline').value;

        if (!postType || !jobTitle || !department || !locationType || !openings || !description || !deadline) {
            alert('Please fill in all required fields (marked with *) before publishing.');
            return;
        }

        const formData = {
            postType: postType,
            jobTitle: jobTitle,
            department: department,
            locationType: locationType,
            openings: parseInt(openings),
            salary: document.getElementById('salary').value.trim(),
            duration: document.getElementById('duration').value.trim(),
            description: description,
            skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s.length > 0),
            deadline: deadline,
            postedOn: new Date().toLocaleDateString()
        };

        console.log('Job Post Data Sent:', formData);

        postConfirmation.style.display = 'flex'; 

        jobPostForm.reset();
    });
});
