/* ======================
   Weather App - API Integration
   Uses Open-Meteo API for real-time weather data
====================== */

console.log("✅ Weather App loaded");

// ======================
// DOM Elements
// ======================

const cityText = document.getElementById("city");
const temperatureText = document.getElementById("temperature");
const windText = document.getElementById("wind");
const output = document.getElementById("output");

// ======================
// Helper Functions
// ======================

/**
 * Log messages to the debug output
 */
function log(message) {
    output.textContent += message + "\n";
}

/**
 * Clear the debug output
 */
function clearOutput() {
    output.textContent = "";
}

// ======================
// Event Listeners for City Buttons
// ======================

document.getElementById("btnKuopio").onclick = function () {
    console.log("Kuopio button clicked");
    loadWeatherByCity("Kuopio", 62.8924, 27.6770);
};

document.getElementById("btnHelsinki").onclick = function () {
    console.log("Helsinki button clicked");
    loadWeatherByCity("Helsinki", 60.1699, 24.9384);
};

document.getElementById("btnTampere").onclick = function () {
    console.log("Tampere button clicked");
    loadWeatherByCity("Tampere", 61.4978, 23.7610);
};

document.getElementById("btnParis").onclick = function () {
    console.log("Paris button clicked");
    loadWeatherByCity("Paris", 48.8566, 2.3522);
};

document.getElementById("btnBayonne").onclick = function () {
    console.log("Bayonne button clicked");
    loadWeatherByCity("Bayonne", 43.4933, -1.4748);
};

document.getElementById("btnGaillac").onclick = function () {
    console.log("Gaillac button clicked");
    loadWeatherByCity("Gaillac", 43.9014, 1.8989);
};

document.getElementById("btnLjubljanabtn").onclick = function () {
    console.log("Ljubljana button clicked");
    loadWeatherByCity("Ljubljana", 46.0569, 14.5058);
};

document.getElementById("btnYakutsk").onclick = function () {
    console.log("Yakutsk button clicked");
    loadWeatherByCity("Yakutsk", 62.0355, 129.6755);
};

document.getElementById("btnLisbon").onclick = function () {
    console.log("Lisbon button clicked");
    loadWeatherByCity("Lisbon", 38.7223, -9.1393);
};

document.getElementById("btnPorto").onclick = function () {
    console.log("Porto button clicked");
    loadWeatherByCity("Porto", 41.1579, -8.6291);
};

document.getElementById("btnArcos").onclick = function () {
    console.log("Arcos de Valdevez button clicked");
    loadWeatherByCity("Arcos de Valdevez", 41.8467, -8.4186);
};

// ======================
// Weather API Function
// ======================

/**
 * Fetch weather data from Open-Meteo API
 * @param {string} cityName - Name of the city
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 */
async function loadWeatherByCity(cityName, latitude, longitude) {
    clearOutput();
    
    // Show loading state
    cityText.textContent = "Loading...";
    temperatureText.textContent = "...";
    windText.textContent = "...";
    
    log("Fetching weather for " + cityName + "...");

    try {
        // Build API URL with coordinates
        const url =
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,wind_speed_10m";

        log("API URL: " + url);
        
        // Fetch data from API
        const response = await fetch(url);

        // Check if response is successful
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        // Parse JSON response
        const data = await response.json();

        // Extract weather data
        const temperature = data.current.temperature_2m;
        const wind = data.current.wind_speed_10m;

        // Update UI
        cityText.textContent = cityName;
        temperatureText.textContent = temperature + " °C";
        windText.textContent = wind + " km/h";

        // Log results
        log("✅ Weather data loaded successfully!");
        log("City: " + cityName);
        log("Temperature: " + temperature + " °C");
        log("Wind Speed: " + wind + " km/h");
        log("Time: " + data.current.time);

    } catch (error) {
        // Handle errors
        cityText.textContent = "Error";
        temperatureText.textContent = "-";
        windText.textContent = "-";
        
        log("❌ Error: " + error.message);
        console.error("Weather API Error:", error);
    }
}

// ======================
// Initial Message
// ======================

log("Ready! Click a city button to load weather data.");