let locaValue = document.querySelector(".search-bar");
let searchButton = document.querySelector(".search-btn");
let cityName = document.querySelector("#city-name");
let temp = document.querySelector(".temp");
let present = document.querySelector(".date");
let weatherCondition = document.querySelector(".condition");
let locationButton = document.querySelector(".location-btn");
let weatherBox = document.querySelector("#weather-card");
const apiKey = "dd5387e349319549d8ef712c4fe0b51a";
weatherBox.classList.remove("weather-card")

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    let cityname = locaValue.value.trim();
    if (!cityname) {
        alert("Please enter a city name");
        return;
    }
    getWeather(cityname);
    locaValue.value = "";
    weatherBox.classList.add("weather-card")
});
// manual search
function getWeather(cityname) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      cityName.innerHTML = data.name;
      temp.innerHTML = `Temperature: ${data.main.temp}°C`;
      present.innerHTML = `Date: ${new Date().toLocaleDateString()}`;
      weatherCondition.innerHTML = `Condition: ${data.weather[0].description}`;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
}
locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          weatherBox.classList.add("weather-card")

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          )
            .then((response) => response.json())
            .then((data) => {
                cityName.innerHTML = data.name;
                temp.innerHTML = `Temperature: ${data.main.temp}°C`;
                present.innerHTML = `Date: ${new Date().toLocaleDateString()}`;
                weatherCondition.innerHTML = `Condition: ${data.weather[0].description}`;
            })
            .catch(() => alert("Weather data not found"));
        },
        () => alert("Location access denied.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });
  
  