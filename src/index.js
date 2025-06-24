const input = document.querySelector("#city-input");
const form = document.querySelector("#weather-form");
const apiKey = "0d038149869545c5994123705252406";

form.addEventListener("submit", add);

async function add(event) {
  event.preventDefault(); // Prevent form from reloading the page
  const city = input.value;
  if (city) {
    console.log(`City added: ${city}`);
    input.value = ""; // Clear the input field after adding
  } else {
    console.log("Please enter a city name.");
  }
  // Fetch weather data for the city
  try {
    const weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const weatherData = await weather.json();
    console.log("Button clicked", weatherData);
    console.log("Data", weatherData.current.temp_c);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
  getPast5DaysWeather(city);
}

async function getPast5DaysWeather(city) {
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${dateString}`
      );
      const data = await response.json();
      console.log(
        `Weather for ${dateString}:`,
        data.forecast.forecastday[0].day.avgtemp_c
      );
    } catch (error) {
      console.error(`Error fetching data for ${dateString}:`, error);
    }
  }
}
