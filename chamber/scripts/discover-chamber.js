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

        // Check if heroImg exists before trying to change its src
        if (heroImg) {
            if (body.classList.contains('dark-mode')) {
                // Switch to dark mode image
                heroImg.src = "images/Porto-ChamberN.jpg";
            } else {
                // Switch to light mode image
                heroImg.src = "images/Porto-ChamberD.jpg";
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
    const heroSection = document.querySelector('main.discover-page'); // Adjusted selector
    const heroMsg = document.querySelector('#hero-msg'); // Adjusted selector
    const footer = document.querySelector('footer'); // Adjusted selector

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        links.classList.toggle('open');

        if (heroSection && heroMsg && footer) {
            if (links.classList.contains('open')) {
                const linksHeight = links.offsetHeight;

                heroSection.style.transform = `translateY(${linksHeight}px)`;
                heroMsg.style.transform = `translateY(${linksHeight}px)`;
                footer.style.transform = `translateY(${linksHeight}px)`;
            } else {
                heroSection.style.transform = 'translateY(0)';
                heroMsg.style.transform = 'translateY(0)';
                footer.style.transform = 'translateY(0)';
            }
        } else {
            console.error('One or more elements not found.');
        }
    });

    // Local storage for last visit date
    const lastVisitKey = 'lastVisit';
    const messageElement = document.getElementById('message');

    const lastVisit = localStorage.getItem(lastVisitKey);
    const now = Date.now();

    if (lastVisit) {
        const daysBetweenVisits = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysBetweenVisits < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else if (daysBetweenVisits === 1) {
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            messageElement.textContent = `You last visited ${daysBetweenVisits} days ago.`;
        }
    } else {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    }

    localStorage.setItem(lastVisitKey, now);
});    