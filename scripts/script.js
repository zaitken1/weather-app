//ADD CURRENT DATE TO CURRENT WEATHER ELEMENT
//Get p element for current day
var currentDateEl = $('.current-date');

//Add current date
var currentDay = moment().format('dddd Do MMMM YYYY');
currentDateEl.text(currentDay);

//GET HTML ELEMENTS
var searchInput = $('.search-input');
var searchBtn = $('.searchBtn');
var itemWrapper = $('main');

function displayMatches(matches) {
    itemWrapper.html('');

    for (var match of matches) {
        itemWrapper.html(`
        <section class="row">
            <div class="current-weather align-center">
                <div>
                    <h2 class="current-city-h2 row justify-center align-center">London</h2>
                    <p class="current-date row justify-center align-center"></p>
                </div>
                <div>
                    <div class="row">
                        <i class="current-weather-icon far fa-sun"></i>
                        <p class="current-temp">32 C</p>
                    </div>
                    <p class="current-humidity">Humidity: 80%</p>
                    <p class="current-wind">Wind Speed: 15mph</p>
                </div>
            </div>
        </section >

        <h2 class="forecast-h2 row justify-center align-center">5-Day Forecast</h2>
        <section class="row">
            <div class="forecast">
                <div class="weather-card column justify-center align-center">
                    <p class="future-date">18/12/2022</p>
                    <div class="card-content row">
                        <div class="column">
                            <i class="future-icon far fa-sun"></i>
                            <p class="future-temp">32 C</p>
                        </div>
                        <div class="column">
                            <p class="future-wind">Wind: 32mph</p>
                            <p class="future-humidity">Humidity: 80%</p>
                        </div>
                    </div>
                </div>
                <div class="weather-card column justify-center align-center">
                    <p class="future-date">18/12/2022</p>
                    <div class="card-content row">
                        <div class="column">
                            <i class="future-icon far fa-sun"></i>
                            <p class="future-temp">32 C</p>
                        </div>
                        <div class="column">
                            <p class="future-wind">Wind: 32mph</p>
                            <p class="future-humidity">Humidity: 80%</p>
                        </div>
                    </div>
                </div>
                <div class="weather-card column justify-center align-center">
                    <p class="future-date">18/12/2022</p>
                    <div class="card-content row">
                        <div class="column">
                            <i class="future-icon far fa-sun"></i>
                            <p class="future-temp">32 C</p>
                        </div>
                        <div class="column">
                            <p class="future-wind">Wind: 32mph</p>
                            <p class="future-humidity">Humidity: 80%</p>
                        </div>
                    </div>
                </div>
                <div class="weather-card column justify-center align-center">
                    <p class="future-date">18/12/2022</p>
                    <div class="card-content row">
                        <div class="column">
                            <i class="future-icon far fa-sun"></i>
                            <p class="future-temp">32 C</p>
                        </div>
                        <div class="column">
                            <p class="future-wind">Wind: 32mph</p>
                            <p class="future-humidity">Humidity: 80%</p>
                        </div>
                    </div>
                </div>
                <div class="weather-card column justify-center align-center">
                    <p class="future-date">18/12/2022</p>
                    <div class="card-content row">
                        <div class="column">
                            <i class="future-icon far fa-sun"></i>
                            <p class="future-temp">32 C</p>
                        </div>
                        <div class="column">
                            <p class="future-wind">Wind: 32mph</p>
                            <p class="future-humidity">Humidity: 80%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `)
    }
}

function getWeatherData(event) {
    event.preventDefault();
    var searchText = searchInput.val().trim().toLowerCase();
    if (searchText) {
        var matches = [];

        for (var weather of weatherData) {
            if (weather.city.toLowerCase().includes(searchText)) {
                matches.push(weather);
            }
        }
        displayMatches(matches);
    }
}

function init() {
    searchBtn.click(getWeatherData)
}

init()



    //Grab HTML elements
    //Get inputs value on search button click
    //Grab data related to user's search
    //Inject the weather items into the DOM based on user's search



