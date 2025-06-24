var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i'); // target <i> inside div
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const monthElement = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

dateElement.textContent =
  new Date().getDate() + ", " + monthElement[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value.trim();
  if (!location) return;

  locationElement.textContent = "Loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";

  const locationApi = fetchWeather + "?address=" + encodeURIComponent(location);

  fetch(locationApi)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        locationElement.textContent = data.error;
      } else {
        const desc = data.description.toLowerCase();

        // Set icon
        if (desc.includes("clear")) {
          weatherIcon.className = "wi wi-day-sunny";
        } else if (desc.includes("cloud")) {
          weatherIcon.className = "wi wi-cloudy";
        } else if (desc.includes("rain")) {
          weatherIcon.className = "wi wi-rain";
        } else if (desc.includes("thunderstorm")) {
          weatherIcon.className = "wi wi-thunderstorm";
        } else if (desc.includes("snow")) {
          weatherIcon.className = "wi wi-snow";
        } else if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) {
          weatherIcon.className = "wi wi-fog";
        } else if (desc.includes("drizzle")) {
          weatherIcon.className = "wi wi-sprinkle";
        } else {
          weatherIcon.className = "wi wi-day-cloudy";
        }

        locationElement.textContent = data.cityName;
        tempElement.textContent = data.temperature + " °C";
        weatherCondition.textContent = data.description;
      }
    })
    .catch(err => {
      locationElement.textContent = "Something went wrong";
    });
});


// {
//       if (data.description === "rain" || data.description === "fog") {
//         weatherIcon.className = "wi-day-cloudy" + data.description
//       } else {
//         weatherIcon.className = "wi wi-day-cloudy"
//       }