const temperature = document.querySelector("#current-temp");
const icon = document.querySelector("#weather-icon");
const figcaption = document.querySelector("figcaption");
const url = "https://api.openweathermap.org/data/2.5/weather?lat=41.00&lon=-8.64&units=metric&APPID=7df97f2950fc6d28758ce291800a8d12";
const threeDayForecastElement = document.getElementById('threeDayForecast');

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const weather = await response.json();
            displayWeather(weather);
        } else {
            throw Error(await response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    icon.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    icon.alt = data.weather[0].description;
    figcaption.innerHTML = titleCase(data.weather[0].description);
}

// Function to fetch weather data and display three-day forecast
async function fetchAndDisplayWeather() {
    const apiKey = '7df97f2950fc6d28758ce291800a8d12';
    const city = 'Porto, Portugal';

    console.log(`Fetching weather data for ${city}...`);
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        console.log('Response status:', response.status); // Log the response status

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        console.log('Weather data received:', data); // Log the data received from the API

        // Clear previous forecast data if any
        threeDayForecastElement.innerHTML = '';

        // Loop through the first three days of forecast data
        for (let i = 0; i < 3; i++) {
            const dayData = data.list[i * 8]; // Weather data for every 8th entry (3-hour intervals)
            const date = new Date(dayData.dt * 1000);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
            const iconUrl = `https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`;
            const temperature = Math.round(dayData.main.temp);

            // Create a div element for each day's forecast
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <p>${dayOfWeek}</p>
                <img src="${iconUrl}" alt="${dayData.weather[0].description}">
                <p>${temperature}°C</p>
            `;

            // Append the forecast item to the forecast container
            threeDayForecastElement.appendChild(forecastItem);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to capitalize the first letter of each word
function titleCase(str) {
    return str.toLowerCase().split(" ").map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
}

// Initial fetch and display of current weather
fetchWeather();

// Initial fetch and display of three-day forecast
fetchAndDisplayWeather();
