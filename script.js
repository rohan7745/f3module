const apiKey = '7e670ee5d61f585d783bcb50472ee82f'; 
const weatherCardsContainer = document.getElementById('weatherCards');
const cityInput = document.getElementById('cityInput');
const addCityBtn = document.getElementById('addCityBtn');

let cities = [];

addCityBtn.addEventListener('click', () => {
  const cityName = cityInput.value.trim();
  if (cityName === '') {
    alert('Please enter a city name');
    return;
  }

  if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
    alert('City already added');
    return;
  }

  fetchWeather(cityName);
  cityInput.value = '';
});

function fetchWeather(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      cities.push(data);
      renderWeatherCards();
    })
    .catch(error => {
      alert(error.message);
    });
}

function renderWeatherCards() {
  weatherCardsContainer.innerHTML = '';
  cities.sort((a, b) => a.main.temp - b.main.temp);

  cities.forEach(city => {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    
    const cityName = city.name;
    const weatherCondition = city.weather[0].main;
    const temperature = city.main.temp;
    const minTemp = city.main.temp_min;
    const maxTemp = city.main.temp_max;
    const humidity = city.main.humidity;
    const pressure = city.main.pressure;
    const windSpeed = city.wind.speed;

    weatherCard.innerHTML = `
      <h2>${cityName}</h2>
      <p>Weather: ${weatherCondition}</p>
      <p>Temperature: ${temperature}°C (Min: ${minTemp}°C / Max: ${maxTemp}°C)</p>
      <p>Humidity: ${humidity}%</p>
      <p>Pressure: ${pressure} hPa</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;
    
    weatherCardsContainer.appendChild(weatherCard);
  });
}
