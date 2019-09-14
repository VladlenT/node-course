const request = require('request');

function forecast(coords, error, callback) {
  if (error) {
    callback(null, error);
    return;
  }

  const url = `https://api.darksky.net/forecast/f7a2ee2176ecc78550622c5559c0f05e/${coords}?units=si`;

  request({ url, json: true }, (error, response) => {
    const { body } = response;
    const forecastData = {
      location: body.timezone,
      forecast: `It is currently ${body.currently.temperature}\u00B0C degrees out. There is ${body.currently.precipProbability}% chance of rain. \n
      Air humidity is ${body.currently.humidity}%.`,
    };

    callback(forecastData, error);
  });
}

module.exports = forecast;
