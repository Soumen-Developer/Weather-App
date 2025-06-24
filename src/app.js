const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();


const weatherData = require('../utils/weatherData');
const { url } = require('inspector');

const port = process .env.PORT || 8000;

const publicStaticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));

// // Log the partials directory contents
// fs.readdirSync(partialsPath).forEach(file => {
//   console.log("Partial found:", file);
// });

console.log("Views Path:", viewsPath);
console.log("Partials Path:", partialsPath);
console.log("Public Static Dir Path:", publicStaticDirPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: '⛅ Weather App',
    });
});


//localhost:3000/weather?address=mumbai -- then the url will genrate
app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({ error: 'You must provide a city name in the search box!' });
    }

    weatherData(address, (error, result) => {
        if (error) {
            console.error("WeatherData Error:", error);
            return res.status(500).send({ error });
        }

        console.log("WeatherData Success:", result);
        res.send(result);
    });
});




app.use((req, res) => {
  res.render('404', {
    title: '404 Page Not Found',
    errorMessage: "Page not found",
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});