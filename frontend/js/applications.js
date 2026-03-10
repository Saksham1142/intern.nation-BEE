document.addEventListener("DOMContentLoaded", () => {

  const viewButtons = document.querySelectorAll(".view-btn");
  viewButtons.forEach(button => {
    button.addEventListener("click", event => {
      const row = event.target.closest("tr");
      const company = row.querySelector("td:nth-child(1)").textContent;
      const position = row.querySelector("td:nth-child(2)").textContent;
      const url = `details.html?company=${encodeURIComponent(company)}&position=${encodeURIComponent(position)}`;
      window.location.href = url;
    });
  });

  const withdrawButtons = document.querySelectorAll(".withdraw-btn");
  withdrawButtons.forEach(button => {
    button.addEventListener("click", event => {
      const row = event.target.closest("tr");
      const company = row.querySelector("td:nth-child(1)").textContent;
      const confirmWithdraw = confirm(`Are you sure you want to withdraw your application from ${company}?`);

      if (confirmWithdraw) {
        const statusCell = row.querySelector("td:nth-child(3)");
        const actionCell = row.querySelector("td:nth-child(4)");

        // Update both status and actions
        statusCell.innerHTML = '<span class="status withdrawn">Withdrawn</span>';
        actionCell.innerHTML = '<span class="actions-withdrawn">N.A.</span>';
      }
    });
  });

});
