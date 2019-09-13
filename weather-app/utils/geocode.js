const request = require('request');

const geocode = (address, callback) => {
  const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=pk.eyJ1IjoidmxhZGxlbnQiLCJhIjoiY2swZ3JheGtxMDlzMDNpbnF1anMxc2dqZiJ9.thn28gE6bR5ZbDx8_i7_UQ`;

  request({ url: geoCodeUrl, json: true }, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }

    const coords = response.body.features[0].center.reverse().join(', ');
    callback(coords, error);
  });
};

module.exports = geocode;
