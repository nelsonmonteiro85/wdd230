// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=50.89&lon=1.03&units=imperial&appid=d8b6dada30c90e5d706e576670538e19";

async function apiFetch(){
    try { 
      const response = await fetch(url);
    if (response.ok){
      const data = await response.json();
      //console.log(data); // test only
      displayResults(data); // uncomment when ready
    } else {
      throw Error (await response.text());
    }
    } catch (error) {
      console.log(error);
    }
  }
  
  apiFetch();
  
  function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)} &deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = titleCase(data.weather[0].description);
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = `${desc}`;
  }
   
  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }