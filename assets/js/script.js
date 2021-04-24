//---------------API Key--------------------
var apiKey = "831c11d2cb8f0310ab1b8fd1a37234be";



//---------------HTML Selectors--------------------
var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#citySearch");
var showName = document.querySelector("#cityName");
var showTemp = document.querySelector("#cityTemp");
var showTempHigh = document.querySelector("#cityTempHigh");
var showTempLow = document.querySelector("#cityTempLow");
var showWind = document.querySelector("#cityWind");
var showHumidity = document.querySelector("#cityHumidity");
var showUvi = document.querySelector("#cityUvi");



//---------------Search for a city---------------
searchButton.addEventListener("click",function(event){
    event.preventDefault();
    var cityInput = searchInput.value;
    console.log(cityInput);
    gatherCity(cityInput);
});

//---------------display current and future conditions for that city---------------
function gatherCity(cityName) {
    var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(currentWeatherApi)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        makeOneCall(data.coord.lat,data.coord.lon);
        showName.textContent=data.name;
        showTemp.textContent="Temp: " + data.main.temp + " F";
        showTempHigh.textContent="High: " + data.main.temp_max + " F";
        showTempLow.textContent="Low: " + data.main.temp_min + "  F";
        showWind.textContent="Wind Speed: " + data.wind.speed + " MPH";
        showHumidity.textContent="Humidity: " + data.main.humidity + " %";
    })
}

function makeOneCall(lat,lon) {
    var oneCall =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`;
    fetch(oneCall)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showUvi.textContent="UV index: " + data.current.uvi;
        
    })
}

//---------------Add city to search history---------------


/*---------------display weather conditions, name, date, weather icon, temperature, humidity, wind speed, UV index---------------*/


//---------------uv index conditional to display favorable, moderate, or severe---------------


//---------------display 5 day forecast---------------


//---------------click on search history to change displayed city---------------

