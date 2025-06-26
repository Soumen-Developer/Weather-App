var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
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

document.addEventListener('DOMContentLoaded', () => {
  if (!weatherCondition.textContent) {
    weatherCondition.textContent = "Hello!!";
    animateElement(weatherCondition, 'animate-fade');

  }
});

// animation trigger function
const animateElement = (el, className) => {
  el.classList.remove(className);
  setTimeout(() => {
    el.classList.add(className);
    setTimeout(() => {
      el.classList.remove(className); // clean up
    }, 700); // matches CSS animation duration
  }, 10); // slight delay to allow DOM update
};

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value.trim();

  if (!location) {
    weatherCondition.textContent = "Please Provide a City Name!!";
    animateElement(weatherCondition, 'animate-fade');

    locationElement.textContent = "";
    tempElement.textContent = "";
    return;
  }

  locationElement.textContent = "Loading...";
  animateElement(locationElement, 'animate-fade');

  tempElement.textContent = "";
  weatherCondition.textContent = "";

  const locationApi = fetchWeather + "?address=" + encodeURIComponent(location);

  fetch(locationApi)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        weatherCondition.textContent = "City Not Found!!";
        animateElement(weatherCondition, 'animate-fade');

        locationElement.textContent = "";
        tempElement.textContent = "";
      } else {
        const desc = data.description.toLowerCase();

        // Set weather icon
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

        // Animate updated content
        locationElement.textContent = data.cityName + "," + data.countryName;
        animateElement(locationElement, 'animate-fade');

        tempElement.textContent = data.temperature + " °C";
        animateElement(tempElement, 'animate-fade');

        weatherCondition.textContent = data.description;
        animateElement(weatherCondition, 'animate-fade');

        animateElement(weatherIcon, 'animate-icon');

        // animateElement(dateElement, 'animate-fade');
      }
    })
    .catch(err => {
      weatherCondition.textContent = "City Not Found!!";
      animateElement(weatherCondition, 'animate-fade');
      locationElement.textContent = "";
      tempElement.textContent = "";
    });
});
