# Weatherly - Modern Weather App

Weatherly is a modern, responsive weather web app built with vanilla JavaScript, [WeatherAPI](https://www.weatherapi.com/), and Tailwind CSS. It provides current weather and the past 5 days' weather for any city, as well as for your current location (with permission). The UI is designed with glassmorphism, gradients, and is fully responsive for mobile, tablet (iPad), and desktop.

---

## Features

- 🌤️ **Current Weather:** Get real-time weather for any city or your current location.
- 📅 **Past 5 Days:** View weather details (temperature, wind, humidity, icon) for the previous 5 days.
- 📍 **Geolocation:** Automatically fetch weather for your current location (with permission).
- 🏙️ **Recent Searches:** Quickly access your last 5 searched cities.
- 💎 **Modern UI:** Responsive, glassmorphic design with smooth gradients and icons.
- ⚡ **Fast & Lightweight:** No frameworks, just HTML, CSS (Tailwind), and JS.

---

## Screenshots

![Weatherly Screenshot](screenshot.png) <!-- Add your screenshot file if available -->

---

## Getting Started

### 1. Clone the repository

```bash
git clone (https://github.com/Prajwal1412/weather_app/)
cd weatherly
```

### 2. Install dependencies

If you want to customize Tailwind, install it locally:

```
npm install
```

### 3. Build Tailwind CSS (if you want to customize)

```bash
npx @tailwindcss/cli -i ./src/style.css -o ./src/output.css --watch
```

### 4. Get a WeatherAPI Key

- Sign up at [WeatherAPI](https://www.weatherapi.com/) and get your free API key.
- Replace the `apiKey` value in `src/index.js` with your key.

### 5. Run the app

Just open `src/index.html` in your browser.

---

## Project Structure

```
weather_app/
├── src/
│   ├── index.html
│   ├── index.js
│   ├── style.css
│   └── output.css
├── README.md
└── ...
```

---

## Customization

- **Colors & Gradients:** Edit Tailwind classes in `index.html` for your preferred color scheme.
- **API Key:** Set your WeatherAPI key in `index.js`.
- **Icons & Fonts:** Uses WeatherAPI icons and Google Fonts (Poppins).

---

## Credits

- [WeatherAPI](https://www.weatherapi.com/) for weather data and icons.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.



**Enjoy
