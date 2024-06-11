document.addEventListener("DOMContentLoaded", function() {
    // Current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
  
    // Last modified date
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;
  });  