document.addEventListener('DOMContentLoaded', function () {
    // Update current year
    const date = new Date().getFullYear();
    document.querySelector('.currentYear').textContent = date;

    // Update last modified date
    const lastModifiedDate = new Date(document.lastModified).toLocaleString();
    document.querySelector('.lastModified').textContent = lastModifiedDate;

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const heroImg = document.querySelector('.hero-img');

    darkModeToggle.addEventListener('click', () => {
        console.log('Dark mode toggle clicked');
        body.classList.toggle('dark-mode');

        // Check if heroImg exists before trying to change its src
        if (heroImg) {
            if (body.classList.contains('dark-mode')) {
                // Switch to dark mode image
                heroImg.src = "images/Porto-ChamberN.webp";
            } else {
                // Switch to light mode image
                heroImg.src = "images/Porto-ChamberD.webp";
            }
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
    const mainContent = document.querySelector('.main-directory');
    const heroSection = document.querySelector('.hero');
    const heroMsg = document.querySelector('#hero-msg');
    const footer = document.querySelector('footer');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            links.classList.toggle('open');

            if (links.classList.contains('open')) {
                const linksHeight = links.offsetHeight;

                if (heroSection) heroSection.style.transform = `translateY(${linksHeight}px)`;
                if (heroMsg) heroMsg.style.transform = `translateY(${linksHeight}px)`;
                if (mainContent) mainContent.style.transform = `translateY(${linksHeight}px)`;
                if (footer) footer.style.transform = `translateY(${linksHeight}px)`;
                if (mainContent) mainContent.style.transition = 'transform 0.9s ease';
            } else {
                if (heroSection) heroSection.style.transform = 'translateY(0)';
                if (heroMsg) heroMsg.style.transform = 'translateY(0)';
                if (mainContent) mainContent.style.transform = 'translateY(0)';
                if (footer) footer.style.transform = 'translateY(0)';
            }
        });
    }
});
