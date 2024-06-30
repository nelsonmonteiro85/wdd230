document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle week links visibility and save state in local storage
    function toggleLinks(id) {
        const weekLinksToShow = document.getElementById(id);
        const weekLinks = document.querySelectorAll('.week-links');

        if (weekLinksToShow.style.display === 'block') {
            weekLinksToShow.style.display = 'none';
            localStorage.setItem(id, 'hidden');
        } else {
            weekLinks.forEach(link => {
                link.style.display = 'none';
            });
            weekLinksToShow.style.display = 'block';
            localStorage.setItem(id, 'visible');
        }
    }

    // Restore visibility of week links based on local storage
    const weekLinks = document.querySelectorAll('.week-links');
    weekLinks.forEach(link => {
        const id = link.id;
        const state = localStorage.getItem(id);
        if (state === 'visible') {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    });

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = "☀️";
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = "☀️";
        } else {
            localStorage.removeItem('darkMode');
            darkModeToggle.textContent = "🌙";
        }
    });

    // Hamburger menu toggle functionality
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');
    const mainContent = document.querySelector('main');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');

        if (mainNav.classList.contains('open')) {
            // Slide the main content down slightly
            mainContent.style.transform = 'translateY(0vh)'; // Adjust this value as needed
            mainContent.style.transition = 'transform 0.3s ease'; // Smooth transition
        } else {
            // Slide the main content back to its original position
            mainContent.style.transform = 'translateY(0)';
        }
    });
});