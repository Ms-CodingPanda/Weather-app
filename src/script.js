let today = new Date();
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];
let date = today.getDate();
let hour = today.getHours();
let minute = today.getMinutes();
let ampm = hour >= 12 ? "pm" : "am";
hour = hour % 12;
hour = hour ? hour : 12;
minute = minute.toString().padStart(2, "0");

h2.innerHTML = `${day} ${month} ${date}, ${hour}:${minute} ${ampm}`;

function search(city) {
  let apiKey = "2c7268e3738531d9fe5ed5aee1a022d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(cityTemp);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  delete forecast[0];

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `            
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="" id="forecast-icon"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ada1f79db1942604234797e2dd089b48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}
function cityTemp(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".degrees").innerHTML = `${temperature}°`;

  let highElement = Math.round(response.data.main.temp_max);
  document.querySelector(".high").innerHTML = `${highElement}`;

  let LowElement = Math.round(response.data.main.temp_min);
  document.querySelector(".low").innerHTML = `${LowElement}`;

  let windElement = Math.round(response.data.wind.speed);
  document.querySelector(".wind").innerHTML = `${windElement}`;

  let weatherDescription = response.data.weather[0].main;
  document.querySelector(
    "#weather-icon-name"
  ).innerHTML = `${weatherDescription}`;

  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function citySearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  let city = `${searchInput.value}`;
  search(city);
}
let submitInput = document.querySelector("#findCity");
submitInput.addEventListener("submit", citySearch);

function searchLocation(position) {
  let apiKey = "2c7268e3738531d9fe5ed5aee1a022d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(cityTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector(".locate");
locationButton.addEventListener("click", currentLocation);

search("Denver");

function celsiusTemp(event) {
  event.preventDefault();
  let degrees = document.querySelector(".degrees");
  degrees.innerHTML = `24°`;
}

let temperatureC = document.querySelector("#celsius");
temperatureC.addEventListener("submit", celsiusTemp);
