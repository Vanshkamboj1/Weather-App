 
const apiKey = "2a0fa629e0b73e3e0d30b2a941eed4e2";
const weatherDiv = document.getElementById("weather");
const forecastDiv = document.getElementById("forecast");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const themeToggle = document.getElementById("themeToggle");
const weatherIcon = document.getElementById("weatherIcon");

let tempChart;

// fetch current weather
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    alert("City not found!");
    return null;
  }
  return await res.json();
}

// fetch 5-day forecast
async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return await res.json();
}

// update UI with weather
function displayWeather(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.querySelector(".wind").textContent = `Wind: ${data.wind.speed} km/h`;
  document.querySelector(".desc").textContent = data.weather[0].main;

  const condition = data.weather[0].main.toLowerCase();
  if (condition.includes("cloud")) weatherIcon.src = "images/clouds.png";
  else if (condition.includes("clear")) weatherIcon.src = "images/clear.png";
  else if (condition.includes("rain")) weatherIcon.src = "images/rain.png";
  else if (condition.includes("drizzle")) weatherIcon.src = "images/drizzle.png";
  else if (condition.includes("mist")) weatherIcon.src = "images/mist.png";
  else weatherIcon.src = "images/clear.png";
}

// update UI with forecast
function displayForecast(data) {
  forecastDiv.innerHTML = "";
  const daily = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date] && item.dt_txt.includes("12:00:00")) {
      daily[date] = item;
    }
  });

  const labels = [];
  const temps = [];

  Object.keys(daily).slice(0, 5).forEach(date => {
    const forecast = daily[date];
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(forecast.main.temp);
    const icon = forecast.weather[0].main.toLowerCase();

    const div = document.createElement("div");
    div.classList.add("forecast-day");
    div.innerHTML = `
      <h3>${day}</h3>
      <img src="images/${icon.includes("cloud") ? "clouds" : 
        icon.includes("clear") ? "clear" : 
        icon.includes("rain") ? "rain" : 
        icon.includes("drizzle") ? "drizzle" : 
        icon.includes("mist") ? "mist" : "clear"}.png" alt="">
      <p>${temp}°C</p>
      <p>${forecast.weather[0].main}</p>
    `;
    forecastDiv.appendChild(div);

    labels.push(day);
    temps.push(temp);
  });

  renderChart(labels, temps);
}

// render temperature chart
function renderChart(labels, temps) {
  const ctx = document.getElementById("tempChart").getContext("2d");
  if (tempChart) tempChart.destroy();
  tempChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Temp (°C)",
        data: temps,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.3)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "#007bff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: false } }
    }
  });
}

// search button
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;
  const weatherData = await fetchWeather(city);
  if (weatherData) displayWeather(weatherData);
  const forecastData = await fetchForecast(city);
  if (forecastData) displayForecast(forecastData);
});

// enter key search
cityInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchBtn.click();
});

// dark/light mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
