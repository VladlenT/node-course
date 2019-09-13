const request = require('request');
const chalk = require('chalk');

function forecast(coords, error) {
  if (error) {
    console.error(error);
    return;
  }

  const url = `https://api.darksky.net/forecast/f7a2ee2176ecc78550622c5559c0f05e/${coords}?units=si`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log(chalk.red(error));
      return;
    }

    const { body } = response;

    console.log(`
      The weather in ${body.timezone}:
      It is currently ${body.currently.temperature}\u00B0C degrees out. 
      There is ${body.currently.precipProbability}% chance of rain. 
    `);
  });
}

module.exports = forecast;
