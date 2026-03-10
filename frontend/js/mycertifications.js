document.addEventListener('DOMContentLoaded', function() {
  const viewButtons = document.querySelectorAll('.view-certificate-btn');

  viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const card = button.closest('.certification-card');
      const status = card.querySelector('.certification-status');
      const title = card.querySelector('.certification-header h3').textContent;
      const issuer = card.querySelector('.certification-issuer').textContent;
      const date = card.querySelector('.certification-date').textContent;
      const description = card.querySelector('.certification-description').textContent;

      if (status.classList.contains('completed')) {
        // Create a simple certificate HTML
        const certificateHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate - ${title}</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f4f4f4; }
              .certificate { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
              h1 { color: #333; }
              p { margin: 10px 0; }
              .logo { font-size: 24px; font-weight: bold; color: #007bff; }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="logo">intern.nation</div>
              <h1>Certificate of Completion</h1>
              <p>This is to certify that</p>
              <h2>Student Name</h2>
              <p>has successfully completed</p>
              <h3>${title}</h3>
              <p>${description}</p>
              <p><strong>${issuer}</strong></p>
              <p><strong>${date}</strong></p>
              <p>Issued by intern.nation</p>
            </div>
          </body>
          </html>
        `;

        const newWindow = window.open('', '_blank');
        newWindow.document.write(certificateHTML);
        newWindow.document.close();
      } else {
        alert('Certificate not available yet. This certification is still in progress.');
      }
    });
  });
});
