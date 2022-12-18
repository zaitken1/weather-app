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

function getWeatherData(event) {
    event.preventDefault();
    var searchText = searchInput.val();

    console.log(searchText);
}

function init() {
    searchBtn.click(getWeatherData)
}

init()



//Grab HTML elements
//Get inputs value on search button click
//Grab data related to user's search
//Inject the weather items into the DOM based on user's search
