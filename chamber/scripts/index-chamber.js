document.addEventListener('DOMContentLoaded', function () {
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
    const links = document.querySelector('.links');
    const mainContent = document.querySelector('.main-home');
    const heroSection = document.querySelector('.hero');
    const heroMsg = document.querySelector('#hero-msg');
    const footer = document.querySelector('footer');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('open');
        links.classList.toggle('open');

        if (links.classList.contains('open')) {
            const linksHeight = links.offsetHeight;

            heroSection.style.transform = `translateY(${linksHeight}px)`;
            heroMsg.style.transform = `translateY(${linksHeight}px)`;
            mainContent.style.transform = `translateY(${linksHeight}px)`;
            footer.style.transform = `translateY(${linksHeight}px)`;
            mainContent.style.transition = 'transform 0.3s ease';
        } else {
            heroSection.style.transform = 'translateY(0)';
            heroMsg.style.transform = 'translateY(0)';
            mainContent.style.transform = 'translateY(0)';
            footer.style.transform = 'translateY(0)';
        }
    });
});    
