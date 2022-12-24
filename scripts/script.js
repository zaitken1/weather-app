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

function getWeatherData(event) {
    event.preventDefault();
    var city = searchInput.val().trim().toLowerCase();

    if (city) {
        var matches = [];
        function inputSubmit(cityName) {
            $.get(currentURL + `q=${cityName}`)
                .then(function (currentData) {

                    historyEl.html(`
                    <button class="search-history">London</button>
                    `);

                    introPara.html('');
                    forecastEl.html('');

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

                    $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
                        .then(function (forecastData) {

                            for (var forecastObj of forecastData.list) {

                                var dateTime = forecastObj.dt_txt;

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
    }

    inputSubmit(city);

}

function init() {
    searchBtn.click(getWeatherData)
}

init();
