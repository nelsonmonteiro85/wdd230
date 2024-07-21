
// Update current year
let date = new Date().getFullYear();
const currentYearElement = document.querySelector(".currentYear");
if (currentYearElement) {
    currentYearElement.textContent = date;
}

// Update last modified date
let lastModifiedDate = new Date(document.lastModified).toLocaleString();
const lastModifiedElement = document.querySelector(".lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = lastModifiedDate;
}

// Set the hidden timestamp field with the current date and time
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    let timestamp = new Date().toISOString();
    timestampField.value = timestamp;
}

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const heroImg = document.querySelector('.hero-img');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
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
}

// Hamburger menu toggle functionality
const hamburger = document.getElementById('hamburger');
const links = document.querySelector('.links');
const mainContent = document.querySelector('main.main-join'); // Adjusted selector
const heroMsg = document.querySelector('#hero-msg'); // Adjusted selector
const footer = document.querySelector('footer'); // Adjusted selector

if (hamburger) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        links.classList.toggle('open');

        if (mainContent && heroMsg && footer) {
            if (links.classList.contains('open')) {
                const linksHeight = links.offsetHeight;

                mainContent.style.transition = 'transform 0.9s ease'; // Add delay
                heroMsg.style.transition = 'transform 0.9s ease'; // Add delay
                footer.style.transition = 'transform 0.9s ease'; // Add delay

                mainContent.style.transform = `translateY(${linksHeight}px)`;
                heroMsg.style.transform = `translateY(${linksHeight}px)`;
                footer.style.transform = `translateY(${linksHeight}px)`;
            } else {
                mainContent.style.transform = 'translateY(0)';
                heroMsg.style.transform = 'translateY(0)';
                footer.style.transform = 'translateY(0)';
            }
        } else {
            console.error('One or more elements not found.');
        }
    });
}
