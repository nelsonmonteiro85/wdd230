document.addEventListener('DOMContentLoaded', function() {
    // Update current year
    let date = new Date().getFullYear();
    document.querySelector(".currentYear").textContent = date;

    // Update last modified date
    let lastModifiedDate = new Date(document.lastModified).toLocaleString();
    document.querySelector(".lastModified").textContent = lastModifiedDate;

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const heroImg = document.querySelector('.hero-img');

    darkModeToggle.addEventListener('click', () => {
        console.log('Dark mode toggle clicked');
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            // Switch to dark mode image
            heroImg.src = "images/Porto-ChamberN.jpg";
        } else {
            // Switch to light mode image
            heroImg.src = "images/Porto-ChamberD.jpg";
        }

        // Toggle dark mode icon text content
        if (darkModeToggle.textContent.includes("🌙")) {
            darkModeToggle.textContent = "☀️";
        } else {
            darkModeToggle.textContent = "🌙";
        }
    });

    // Hamburger menu toggle functionality
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.links');
    const mainContent = document.querySelector('main');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');

        if (mainNav.classList.contains('open')) {
            // Slide the main content down slightly
            mainContent.style.transform = 'translateY(1vh)';
            mainContent.style.transition = 'transform 0.3s ease';
        } else {
            // Slide the main content back to its original position
            mainContent.style.transform = 'translateY(0)';
        }
    });
});
