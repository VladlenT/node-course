const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to use
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather',
    author: 'Vladlen Tereshchenko',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About',
    author: 'Vladlen Tereshchenko',
  });
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'Help page',
    message: 'Welcome to the help page',
    author: 'Vladlen Tereshchenko',
  });
});

app.get('/weather', (req, res) => {
  res.send({ forecast: 'Weather', location: 228 });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
