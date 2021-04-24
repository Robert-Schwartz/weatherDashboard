//---------------API Key-----------------------
var apiKey = "831c11d2cb8f0310ab1b8fd1a37234be";
//---------------Global Variables-----------------------

//---------------HTML Selectors--------------------------------
var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#citySearch");
var clearSearches = document.querySelector("#clear-searches");
var searchHistory = document.querySelector("#saved-searches");
var savedSearches = document.querySelector("#saved-cities");
var showName = document.querySelector("#cityName");
var showTemp = document.querySelector("#cityTemp");
var showTempHigh = document.querySelector("#cityTempHigh");
var showTempLow = document.querySelector("#cityTempLow");
var showWind = document.querySelector("#cityWind");
var showHumidity = document.querySelector("#cityHumidity");
var showUvi = document.querySelector("#cityUvi");

//---------------Search for a city---------------
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var cityInput = searchInput.value;
  allSearches.push(cityInput);
  localStorage.setItem("value", JSON.stringify(allSearches));
  gatherCity(cityInput);
  var historyBtn = document.createElement("button");
  historyBtn.textContent = allSearches[allSearches.length - 1];
  historyBtn.id = "previousBtn";
  searchHistory.appendChild(historyBtn);
});

//---------------Pull Weather Data from oneCall API---------------
function gatherCity(cityName) {
  var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherApi)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      makeOneCall(data.coord.lat, data.coord.lon);
      showName.textContent = data.name;
      showTemp.textContent = "Temp: " + data.main.temp + " F";
      showTempHigh.textContent = "High: " + data.main.temp_max + " F";
      showTempLow.textContent = "Low: " + data.main.temp_min + "  F";
      showWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
      showHumidity.textContent = "Humidity: " + data.main.humidity + " %";
    });
}

function makeOneCall(lat, lon) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`;
  fetch(oneCall)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showUvi.textContent = "UV index: " + data.current.uvi;
    });
}

//---------------Add city to search history---------------
var allSearches = localStorage.getItem("value");
allSearches = JSON.parse(allSearches);
console.log(allSearches);
if (allSearches === null) {
  allSearches = [];
} else {
  for (let i = 0; i < allSearches.length; i++) {
    var historyBtn = document.createElement("button");
    historyBtn.textContent = allSearches[i];
    historyBtn.id = "previousBtn";
    searchHistory.appendChild(historyBtn);
  }
}

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "previousBtn") {
    var btnText = event.target.textContent;
    gatherCity(btnText);
  }
});

//---------------Clear search history---------------
clearSearches.addEventListener("click", function () {
  localStorage.clear();
  searchHistory.innerHTML = "";
});

/*---------------display weather conditions, name, date, weather icon, temperature, humidity, wind speed, UV index---------------*/

//---------------uv index conditional to display favorable, moderate, or severe---------------

//---------------display 5 day forecast---------------

//---------------click on search history to change displayed city---------------
