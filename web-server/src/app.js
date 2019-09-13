const path = require('path');
const express = require('express');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to use
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather',
    name: 'Vladlen',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'Help page',
    message: 'Welcome to the help page',
  });
});

app.get('/weather', (req, res) => {
  res.send({ forecast: 'Weather', location: 228 });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
