//---------------API Key-----------------------
var apiKey = "831c11d2cb8f0310ab1b8fd1a37234be";
//---------------Global Variables-----------------------

//---------------HTML Selectors--------------------------------
let searchInput = document.querySelector("#citySearch");
let searchButton = document.querySelector("#search-button");
let clearSearches = document.querySelector("#clear-searches");
let searchHistory = document.querySelector("#saved-searches");
let savedSearches = document.querySelector("#saved-cities");
let showName = document.querySelector("#cityName");
let showTemp = document.querySelector("#cityTemp");
let showTempHigh = document.querySelector("#cityTempHigh");
let showTempLow = document.querySelector("#cityTempLow");
let showWind = document.querySelector("#cityWind");
let showHumidity = document.querySelector("#cityHumidity");
let showUvi = document.querySelector("#cityUvi");

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
      `http://api.openweathermap.org/data/2.5/forecast?q=${fiveDay}&appid=${apiKey}&units=imperial`
  )
      .then(response => {
          return response.json();
      }).then(data => {
          draw5Weather(data);
      })
  function draw5Weather(data) {
      let cardHead1 = document.querySelector("#cardTitleId1");
      cardHead1.textContent = data.city.name;
      let p1 = document.querySelector("#cardTextId1");
      p1.textContent ="Temp:    " + data.list[0].main.temp +   "Humidity     "  + data.list[0].main.humidity + "   Wind:       " + data.list[0].wind.speed;
  
      let cardHead2 = document.querySelector("#cardTitleId2");
      cardHead2.textContent = data.city.name;
      let p2 = document.querySelector("#cardTextId2");
      p2.textContent ="Temp:    " + data.list[0].main.temp +   "Humidity     "  + data.list[0].main.humidity + "   Wind:       " + data.list[0].wind.speed;
 
      let cardHead3 = document.querySelector("#cardTitleId3");
      cardHead3.textContent = data.city.name;
      let p3 = document.querySelector("#cardTextId3");
      p3.textContent ="Temp:    " + data.list[0].main.temp +   "Humidity     "  + data.list[0].main.humidity + "   Wind:       " + data.list[0].wind.speed;
    
      let cardHead4 = document.querySelector("#cardTitleId4");
      cardHead4.textContent = data.city.name;
      let p4 = document.querySelector("#cardTextId4");
      p4.textContent ="Temp:    " + data.list[0].main.temp +   "Humidity     "  + data.list[0].main.humidity + "   Wind:       " + data.list[0].wind.speed;

      let cardHead5 = document.querySelector("#cardTitleId5");
      cardHead5.textContent = data.city.name;
      let p5 = document.querySelector("#cardTextId5");
      p5.textContent ="Temp:    " + data.list[0].main.temp +   "Humidity     "  + data.list[0].main.humidity + "   Wind:       " + data.list[0].wind.speed;

    }}



//---------------Clear search history---------------
clearSearches.addEventListener("click", function () {
  localStorage.clear();
  searchHistory.innerHTML = "";
});

