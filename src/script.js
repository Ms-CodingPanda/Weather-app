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

function cityTemp(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".degrees").innerHTML = `${temperature}°`;

  let highElement = Math.round(response.data.main.temp_max);
  document.querySelector(".high").innerHTML = `${highElement}`;

  let LowElement = Math.round(response.data.main.temp_min);
  document.querySelector(".low").innerHTML = `${LowElement}`;

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
