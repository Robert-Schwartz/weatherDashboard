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
  searchWeather5day(cityInput); 
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
//----------------UVI index formatting-----------------------
function makeOneCall(lat, lon) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`;
  fetch(oneCall)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showUvi.textContent = "UV index: " + data.current.uvi;
      if (showUvi =="3.12") {
        showUvi.classList = ".favorable";
      } else if (showUvi >= 3 && oneCall.current.uvi <= 5) {
        showUvi.classList.add = ".moderate";
      } else {
        showUvi.classList.add = ".severe";
      }
    });
}
//---------------display 5 day forecast---------------
function searchWeather5day(fiveDay) {
  fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${fiveDay}&appid=${apiKey}`
  )
      .then(response => {
          return response.json();
      }).then(data => {
          draw5Weather(data);
          console.log("!" + fiveDay);
      })
      // .catch(err => {
      //     console.error(err);
      ;

  function draw5Weather(data) {
      let cardHead1 = document.querySelector("#cardTitleId1");
      cardHead1.textContent = data.city.name;
      let p1 = document.querySelector("#cardTextId1");
      p1.textContent ="Temp:    " + data.list[0].main.temp +   "Humidity     "  + data.list[0].main.humidity + "   Wind:       " + data.list[0].wind.speed;
  }}//do this X5

//---------------Add city to search history---------------
var allSearches = localStorage.getItem("value");
allSearches = JSON.parse(allSearches);
if (allSearches === null) {
  allSearches = [];
} else {
  for (let i = 0; i < allSearches.length; i++) {
    var historyBtn = document.createElement("button");
    historyBtn.textContent = allSearches[i];
    historyBtn.id = "previousBtn";
    historyBtn.classList = "btn-secondary";
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

