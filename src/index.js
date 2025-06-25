const apiKey = "0d038149869545c5994123705252406";
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherCards = document.getElementById("weather-cards");
const noLocationMsg = document.getElementById("no-location-message");
const recentCities = document.getElementById("recent-cities");
const forecastContainer = document.getElementById("forecast-container");

//  Load recent cities from localStorage
function loadRecentCities() {
  const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  recentCities.innerHTML = "";
  if (cities.length > 0) {
    recentCities.classList.remove("hidden");
    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      recentCities.appendChild(option);
    });
  } else {
    recentCities.classList.add("hidden");
  }
}

//  Save a city to localStorage
function saveRecentCity(city) {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  cities = [city, ...cities.filter((c) => c !== city)].slice(0, 5);
  localStorage.setItem("recentCities", JSON.stringify(cities));
  loadRecentCities();
}

//  Handle city selection from dropdown
recentCities.addEventListener("change", () => {
  const selectedCity = recentCities.value;
  if (selectedCity) {
    fetchWeatherByCity(selectedCity);
  }
});

//  Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }
  fetchWeatherByCity(city);
});

//  Try geolocation on load
window.addEventListener("DOMContentLoaded", () => {
  loadRecentCities();
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      () => {
        showError("Location permission denied. Please enter location.");
      }
    );
  } else {
    showError("Geolocation is not supported.");
  }
});

//  Show error message
function showError(msg) {
  noLocationMsg.textContent = msg;
  noLocationMsg.classList.remove("hidden");
  weatherCards.classList.add("hidden");
}

//  Fetch current weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    saveRecentCity(data.location.name);
    updateUI(data);
  } catch (err) {
    showError("Failed to get weather for current location.");
    console.error(err);
  }
}

//  Fetch current weather by city name
async function fetchWeatherByCity(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    saveRecentCity(data.location.name);
    updateUI(data);
  } catch (err) {
    showError("City not found.");
    console.error(err);
  }
}

// Update UI with current + past 5-day weather
function updateUI(data) {
  noLocationMsg.classList.add("hidden");
  weatherCards.classList.remove("hidden");

  const today = data.current;
  const location = data.location.name;

  document.getElementById("today-temp").textContent = `${today.temp_c}°C`;
  document.getElementById("today-condition").textContent = today.condition.text;
  document.getElementById(
    "today-wind"
  ).textContent = `Wind: ${today.wind_kph} km/h`;
  document.getElementById("today-icon").src = `https:${today.condition.icon}`;

  getPast5DaysWeather(location); // ← Load past 5-day forecast
}

//  Fetch and display past 5 days of weather
async function getPast5DaysWeather(location) {
  const today = new Date();
  forecastContainer.innerHTML = ""; // Clear old cards

  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split("T")[0];

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${dateString}`
      );
      const data = await response.json();

      const forecast = data.forecast.forecastday[0];
      const day = forecast.day;

      const card = document.createElement("div");
      card.className =
        "bg-white/60 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center p-4 m-2 transition hover:scale-105 hover:shadow-2xl border border-blue-100";

      card.innerHTML = `
        <span class="font-semibold text-blue-700 mb-1">${new Date(
          forecast.date
        ).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}</span>
        <img src="https:${
          day.condition.icon
        }" alt="icon" class="w-14 h-14 my-2 drop-shadow" />
        <div class="text-2xl font-bold text-blue-800 mb-1">${
          day.avgtemp_c
        }°C</div>
        <div class="text-gray-700 text-base mb-1">${day.condition.text}</div>
        <div class="flex gap-2 text-blue-600 text-sm whitespace-nowrap">
          <span>💨 ${day.maxwind_kph} km/h</span>
          <span>💧 ${day.avghumidity}%</span>
        </div>
      `;

      forecastContainer.appendChild(card);
    } catch (error) {
      console.error(`Error fetching data for ${dateString}:`, error);
    }
  }
}
