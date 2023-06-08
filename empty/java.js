let $ = document
let searchBtn = $.querySelector('#search-form')
let cityName = $.querySelector('#city')
let date = $.querySelector("#date");
let temp = $.querySelector("#temperature")
let humidity = $.querySelector("#humidity")
let windSpeed = $.querySelector("#wind")
let desc = $.querySelector("#description")
let currentBtn = $.querySelector("button")


function showWeather(response) {
    cityName.innerHTML = response.data.name
    temp.innerHTML = Math.round(response.data.main.temp)
    humidity.innerHTML = response.data.main.humidity
    windSpeed.innerHTML = Math.round(response.data.wind.speed)
    desc.innerHTML = response.data.weather[0].description;
}
function searched(cityName) {
    let apiKey = "7059cb165caa3316bff682d263a01b1e"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather)
}
function currentLocation(position) {
    console.log(position);
    let apiKey = "7059cb165caa3316bff682d263a01b1e"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather)
}
searchBtn.addEventListener("submit", function (event) {
    event.preventDefault()
    let searchBar = $.querySelector('#city-input').value
    searched(searchBar)
})
currentBtn.addEventListener("click", function (event) {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(currentLocation)
})

function dateHandler(date) {
    let index = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[index];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

date.innerHTML = dateHandler(new Date());
searched("New York")