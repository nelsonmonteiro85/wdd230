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

        if (heroImg) {
            if (body.classList.contains('dark-mode')) {
                heroImg.src = "images/Porto-ChamberN.webp";
            } else {
                heroImg.src = "images/Porto-ChamberD.webp";
            }
        }

        darkModeToggle.textContent = body.classList.contains('dark-mode') ? "☀️" : "🌙";
    });
}

// Hamburger menu toggle functionality
const hamburger = document.getElementById('hamburger');
const links = document.querySelector('.links');

// Check which page we are on
const isThankYouPage = body.classList.contains('thankyou-page');
const isJoinPage = body.classList.contains('join-page');

if (hamburger) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        links.classList.toggle('open');

        // Apply specific logic based on the current page
        if (isThankYouPage) {
            const mainContent = document.querySelector('main.main-thanks');
            const heroMsg = document.querySelector('#hero-msg');
            const footer = document.querySelector('footer');

            if (mainContent && heroMsg && footer) {
                const linksHeight = links.offsetHeight;
                if (links.classList.contains('open')) {
                    mainContent.style.transition = 'transform 0.9s ease';
                    heroMsg.style.transition = 'transform 0.9s ease';
                    footer.style.transition = 'transform 0.9s ease';
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
        } else if (isJoinPage) {
            const mainContent = document.querySelector('main.main-join');
            const heroMsg = document.querySelector('#hero-msg');
            const footer = document.querySelector('footer');

            if (mainContent && heroMsg && footer) {
                const linksHeight = links.offsetHeight;
                if (links.classList.contains('open')) {
                    mainContent.style.transition = 'transform 0.9s ease';
                    heroMsg.style.transition = 'transform 0.9s ease';
                    footer.style.transition = 'transform 0.9s ease';
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
        }
    });
}
