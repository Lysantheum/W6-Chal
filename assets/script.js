const apiKey = '891d7b1e8203a6c47aa00ddbfb5c18b1';
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const searchHistoryDiv = document.getElementById('searchHistory')
let searchHistory = [];

//Event listener for form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
})

async function getWeather(city) {
    
    try {
        const response = await fetch('https://api.openweathermap.org/data/3.0/onecall?lat={33.44}&lon={-112.07}&exclude={}&appid={891d7b1e8203a6c47aa00ddbfb5c18b1}');
        //console.log(response);
        const data = await response.json();
        displayCurrentWeather(data);
        searchHistory.push(city);
        displaySearchHistory();
    }   catch (error) {
        console.error('Error fetching weather data', error);
    }
}
//function to display current weather
function displayCurrentWeather(data) {
    const {name, dt, main, weather, wind} = data;
    if (name && dt && main && weather && weather.length > 0 && wind) {
    const date = new Date(dt * 1000).toLocaleDateString();
    const weatherIcon = weather && weather.length > 0 ? weather[0].icon: '';
    const weatherDescription = weather && weather.length > 0 ? weather[0].description:'unknown';
    currentWeatherDiv.innerHTML = `
    <h2>${name} (${date})</h2>
    <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weather[0].description}">
    <p> Temperature: ${main.temp}°C</p>
    <p> Humidity: ${main.humidity}%</p>
    <p> Wind Speed: ${wind.speed} m/s</p>
    `;
} else {
    currentWeatherDiv.innerHTML = '<p> Weather data unavailable </p>'
}
}
//function to display 5-day forecast
function displayForecast(data) {

}

// Function to dispaly search history

function displaySearchHistory() {
    searchHistoryDiv.innerHTML = '<h2>Search History</h2>';
    searchHistory.forEach(city => {
        const cityElement = document.createElement('p');
        cityElement.textContent = city;
        cityElement.addEventListener('click', () => getWeather(city));
        searchHistoryDiv.appendChild(cityElement);
    })
}

