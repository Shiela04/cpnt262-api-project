document.addEventListener("DOMContentLoaded", () => {
  // load preferences when the page loads
  loadPreferences();

  // save username to local storage and show greeting when save name button is clicked
  document.getElementById("save-name").addEventListener("click", () => {
    const username = document.getElementById("username").value;

    if (username) {
      // save username to local storage
      localStorage.setItem("username", username);

      // display greeting
      document.getElementById(
        "personal-greeting"
      ).textContent = `Hello, ${username}!`;

      // save cookie for 1 year
      document.cookie = `username=${username}; max-age=${60 * 60 * 24 * 365}`;
    }
  });

  // save preferences on form submission
  document
    .getElementById("weather-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const city = document.getElementById("city").value;
      const unit = document.getElementById("unit-toggle").value;

      // error if no city entered
      if (!city) {
        document.getElementById("city-error-message").textContent =
          "Enter a city name.";
        return;
      }

      // error will clear after city is entered and form submitted
      document.getElementById("city-error-message").textContent = "";

      // save temperature unit to local storage
      localStorage.setItem("unit", unit);

      // save city to session storage
      sessionStorage.setItem("city", city);

      // fetch weather data
      try {
        const apiKey = "93426847adde4ab59aae459329223b60";
        const encodedCity = encodeURIComponent(city);
        const unitMapping = {
          celsius: "metric",
          fahrenheit: "imperial",
        };
        // default to celsius
        const apiUnit = unitMapping[unit] || "metric";
        const endpoint = `https://api.weatherbit.io/v2.0/current?city=${encodedCity}&units=${apiUnit}&key=${apiKey}`;
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        document.getElementById(
          "weather-info"
        ).innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });
});

// load saved preferences from local storage or session storage
function loadPreferences() {
  // load username from local storage or cookie
  const username = localStorage.getItem("username") || getCookie("username");

  if (username) {
    document.getElementById("username").value = username;
    document.getElementById(
      "personal-greeting"
    ).textContent = `Hello, ${username}!`;
  }

  const unit = localStorage.getItem("unit") || "celsius";

  document.getElementById("unit-toggle").value = unit;

  const city = sessionStorage.getItem("city");

  if (city) {
    document.getElementById("city").value = city;
  }
}

// display weather data on the page
function displayWeather(data) {
  const weatherData = data.data[0];
  const { city_name, weather, temp, app_temp, rh } = weatherData;
  const description = weather.description;

  document.getElementById("weather-info").innerHTML = `
    <h2>${city_name}</h2>
    <p>Description: ${description}</p>
    <p>Temperature: ${temp}°</p>
    <p>Feels Like: ${app_temp}°</p>
    <p>Humidity: ${rh}%</p>`;
}
//  fetch cookies by name
function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.startsWith(cookieName)) {
      return c.substring(cookieName.length);
    }
  }
  return null;
}
