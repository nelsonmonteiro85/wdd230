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

    // Function to update and display the visit counter
    function updateVisitCounter() {
        const visitCounter = document.querySelector('.visit-counter');
        let numVisits = localStorage.getItem('pageVisits');

        // Initialize visit count if it doesn't exist in localStorage
        if (numVisits === null) {
            localStorage.setItem('pageVisits', '0');
            numVisits = 0;
        } else {
            numVisits = parseInt(numVisits);
        }

        // Increment the visit count
        numVisits++;
        localStorage.setItem('pageVisits', numVisits.toString());

        // Update the visit counter display
        visitCounter.textContent = numVisits.toString();
    }

    // Call the function to update and display the visit counter on page load
    updateVisitCounter();

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

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

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');

        if (mainNav.classList.contains('open')) {
            // Slide the main content down slightly
            mainContent.style.transform = 'translateY(0vh)';
            mainContent.style.transition = 'transform 0.3s ease'; // Smooth transition
        } else {
            // Slide the main content back to its original position
            mainContent.style.transform = 'translateY(0)';
        }
    });

    async function fetchWeather() {
        const temperature = document.querySelector("#current-temp");
        const icon = document.querySelector("#weather-icon");
        const description = document.querySelector("#weather-description");

        const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=41.00&lon=-8.64&units=metric&APPID=7df97f2950fc6d28758ce291800a8d12";

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
