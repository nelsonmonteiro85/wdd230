document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded successfully.');

    // Function to toggle week links visibility and save state in local storage
    function toggleLinks(id) {
        const weekLinksToShow = document.getElementById(id);
        const weekLinks = document.querySelectorAll('.week-links');

        if (!weekLinksToShow) {
            console.error(`Element with ID '${id}' not found.`);
            return;
        }

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

    // Function to update and display the visit counter
    function updateVisitCounter() {
        const visitCounter = document.querySelector('.visit-counter');
        if (!visitCounter) {
            console.error('Visit counter element not found.');
            return;
        }

        let numVisits = localStorage.getItem('pageVisits');
        numVisits = numVisits ? parseInt(numVisits) : 0;
        numVisits++;
        localStorage.setItem('pageVisits', numVisits.toString());
        visitCounter.textContent = numVisits.toString();
    }

    // Call the function to update and display the visit counter on page load
    updateVisitCounter();

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    if (!darkModeToggle || !body) {
        console.error('Dark mode toggle or body element not found.');
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = "☀️";
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        darkModeToggle.textContent = "🌙";
        localStorage.removeItem('darkMode');
    }

    // Hamburger menu toggle functionality
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');
    const mainContent = document.querySelector('main');

    if (!hamburger || !mainNav || !mainContent) {
        console.error('Hamburger, main nav, or main content element not found.');
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');

        if (mainNav.classList.contains('open')) {
            mainContent.style.transform = 'translateY(0vh)';
            mainContent.style.transition = 'transform 0.3s ease'; // Smooth transition
        } else {
            mainContent.style.transform = 'translateY(0)';
        }
    });

    // Function to fetch and display current weather
    async function fetchWeather() {
        const temperature = document.querySelector("#current-temp");
        const icon = document.querySelector("#weather-icon");
        const description = document.querySelector("#weather-description");

        if (!temperature || !icon || !description) {
            console.error('Weather elements not found.');
            return;
        }

        const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=50.89&lon=1.03&units=metric&appid=d8b6dada30c90e5d706e576670538e19";

        try {
            const response = await fetch(currentWeatherUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const weatherData = await response.json();
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching current weather:', error);
        }

        function displayWeather(data) {
            temperature.textContent = Math.round(data.main.temp) + "°C";
            icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            icon.alt = data.weather[0].description;
            description.textContent = titleCase(data.weather[0].description);
        }

        function titleCase(str) {
            return str.toLowerCase().split(" ").map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(" ");
        }
    }

    // Initial fetch and display of current weather
    fetchWeather();
});
