//Add current date to current weather element
//Get p element for current day
var currentDateEl = $('.current-date');

//Add current date
var currentDay = moment().format('dddd Do MMMM YYYY');

//Get HTML elements
var searchInput = $('.search-input');
var searchBtn = $('.searchBtn');
var itemWrapper = $('main');
var introPara = $('.introPara');
var forecastSection = $('.forecast-section');
var forecastEl = $('.forecast');
var historyEl = $('.history');

//OPENWEATHER API
//Global variables required for Open Weather API
var apiKey = 'cc0b5674499c26e188072975d36326e1';
var baseURL = 'https://api.openweathermap.org/data/2.5/';
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconURL = 'https://openweathermap.org/img/w/';

//Checks localStorage for items
var searchHistory = JSON.parse(localStorage.getItem("city")) || [];

//Adds localStorage items to page on page load
historyEl.html('');

//creates button with class search-history for each item in localStorage
for (let i = 0; i < searchHistory.length; i++) {
    var create = $("<button>");
    create.attr("class", "search-history");
    create.text(searchHistory[i]);
    historyEl.append(create);
}

//Get HTML of search history button
var historyBtn = $('.search-history');

//Function runs when search button is clicked - this function is called in init function
function getWeatherData(event) {
    event.preventDefault();

    //saves user's input to a variable
    var city = searchInput.val().trim().toLowerCase();
    var cityUpperCase = searchInput.val().trim();

    //Creates dynamically generated HTML for current and future forecast based on user input
    if (city) {

        var matches = [];
        function inputSubmit(cityName) {
            //API call for current forecast
            $.get(currentURL + `q=${cityName}`)
                .then(function (currentData) {

                    //pushes users input to localStorage array and creates new search history button if item doesn't already exist in localStorage
                    //if localStorage value contains search input text, add forecast data, else add button, setitem to localSotrage and display forecast data
                    if (searchHistory.includes(city)) {
                        searchHistory.push(cityUpperCase);
                        console.log('it works');

                        //clears searchInput and historyEl HTML each time new search item entered
                        searchInput.val('');
                        historyEl.html('');

                        //Create search-history button if a match is found
                        for (let i = 0; i < searchHistory.length; i++) {
                            var create = $("<button>");
                            create.attr("class", "search-history");
                            create.text(searchHistory[i]);
                            historyEl.append(create);  
                        }

                        localStorage.setItem("city", JSON.stringify(searchHistory));
                        
                    }


                    introPara.html('');
                    forecastEl.html('');

                    //Dynamically generated HTML for current forecast based on user input and returned API data
                    introPara.html(`
                        <section class="row">
                            <div class="current-weather align-center">
                                <div>
                                    <h2 class="current-city-h2 row justify-center align-center">${currentData.name}</h2>
                                    <p class="current-date row justify-center align-center">${currentDay}</p>
                                </div>
                                <div>
                                    <div class="row">
                                        <i class="current-weather-icon" href="${iconURL + currentData.weather[0].icon}.png"></i>
                                        <p class="current-temp">${Math.round(currentData.main.temp)}°C</p>
                                    </div>
                                    <p class="current-humidity">Humidity: ${currentData.main.humidity}%</p>
                                    <p class="current-wind">Wind: ${currentData.wind.speed}mph</p>
                                </div>
                            </div>
                        </section >
                    `);

                    //API call for future 5-day forecast
                    $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
                        .then(function (forecastData) {

                            for (var forecastObj of forecastData.list) {

                                var dateTime = forecastObj.dt_txt;

                                //Dynamically generated HTML for future forecast based on user input and returned API data, and if time = 12:00
                                if (dateTime.includes("12:00:00")) {

                                    forecastSection.show();

                                    forecastEl.append(`
                                            <div class="weather-card column justify-center align-center">
                                                <p class="future-date">${forecastObj.dt_txt}</p>
                                                <div class="card-content row">
                                                    <div class="column">
                                                        <i class="future-icon" href="${iconURL + forecastObj.weather[0].icon}.png"></i>
                                                        <p class="future-temp">${Math.round(forecastObj.main.temp)}°C</p>
                                                    </div>
                                                    <div class="column">
                                                        <p class="future-wind">Wind: ${forecastObj.wind.speed}</p>
                                                        <p class="future-humidity">Humidity: ${forecastObj.main.humidity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                    `);
                                }
                            }
                        });
                });
        }
    } else if (city == "" || city == null) {
        introPara.html('');
        introPara.html(`
        <p class="para row justify-center">No search results found. Please enter a city to see a 5-day forecast.</p>
        `);
    }

    inputSubmit(city);

}

//Function to add search history button text to input field on click
function hist() {
    $(document).ready(function () {
        historyBtn.click(function (event) {
            event.preventDefault();
            var text = $(this).text();
            searchInput.val(text);
            getWeatherData(event);
        });
    });
}

hist();

//Starting function on search button click
function init() {
    searchBtn.click(getWeatherData);
}

init();