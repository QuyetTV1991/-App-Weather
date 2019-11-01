// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const iconEle = document.querySelector('.weather-icon')
const tempEle = document.querySelector('.temperature-value')
const descEle = document.querySelector('.temperature-description p')
const locationEle = document.querySelector('.location p')
const notificationEle = document.querySelector('.notification')

const weather = {}

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273
const key = "82005d27a116c2880c8f0fcb866998a0"

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showErr)
}
else {
    notificationEle.style.display = "block"
    notificationEle.innerHTML = "<p>Brower doesn't support Geolocation</p>"
}

function setPosition(positon) {
    let latitude = positon.coords.latitude
    let longitude = positon.coords.longitude

    getWeather(latitude, longitude)
}

function showErr(error) {
    notificationEle.style.display = "block"
    notificationEle.innerHTML = `<p> User Denied Location </p>`
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
        .then(function(response){
            let data = response.json()
            return data
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN)
            weather.description = data.weather[0].description
            weather.iconId = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
        })
        .then(function(){
            displayWeather()
        })
}

function displayWeather() {
    iconEle.innerHTML = `<img src="./icons/${weather.iconId}.png" alt="">`
    tempEle.innerHTML = `<p>${weather.temperature.value} *<span>C</span></p>`
    descEle.innerHTML = weather.description
    locationEle.innerHTML = `${weather.city} , ${weather.country}`
}

tempEle.addEventListener('click', function() {
    if(weather.temperature.value === undefined) return

    if(weather.temperature.unit == "celsius") {
        let fahrenheit = Math.floor(celsiusToFahrenheit(weather.temperature.value))

        tempEle.innerHTML = `<p>${fahrenheit} *<span>F</span></p>`
        weather.temperature.unit = "fahrenheit"
    }
    else {
        tempEle.innerHTML = `<p>${weather.temperature.value} *<span>C</span></p>`
        weather.temperature.unit = "celsius"
    }
})

function celsiusToFahrenheit(temperature) {
    return temperature * 9 /5 + 32
}