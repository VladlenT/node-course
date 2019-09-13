const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');

const location = process.argv[2];

if (location) {
  geocode(location, forecast);
} else {
  console.log(chalk.yellow('Provide location to get forecast.'));
}
