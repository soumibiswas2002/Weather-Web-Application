//selecting all classes
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

//app data
const weather = {};
weather.temperature = {
  unit: "celsius"
}

const KELVIN = 273;
//API KEY
const key = "710d0e0eec82cb3cf1e95f6430413e7a";

//check idf browser supports geolocation
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}
//set user's setPosition
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
//show error when occurs issue sbout Geolocation
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

//getting weather details from API provider
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)  //request to the server and load the information in my
    .then(function(response){
      let data=response.json();   //read and analyse the data
      return data;
    })
    .then(function(data){
      weather.temperature.value=Math.floor(data.main.temp-KELVIN);
      weather.description=data.weather[0].description;
      weather.iconId=data.weather[0].icon;
      weather.city=data.name;
      weather.country=data.sys.country;
    })
    .then(function(){
      displayWeather();
    })
}

//DISPLAY WEATHER
function displayWeather(){
  iconElement.innerHTML=`<img src="icons/${weather.iconId}.png">`;
  tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML=`${weather.description}`;
  locationElement.innerHTML=` ${weather.city} , ${weather.country} `;
}

//C TO F conversition
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

//when user click on temperature Element
tempElement.addEventListener("click",function(){
  if(weather.temperature.value===undefined)
    return;
  if(weather.temperature.unit==="celsius"){
    let fahrenheit=Math.floor(celsiusToFahrenheit(weather.temperature.value))

    tempElement.innerHTML=`${fahrenheit}°<span>F</span>`;
    weather.temperature.unit="fahrenheit";
  }else{
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit="celsius";
  }
});
