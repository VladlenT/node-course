const https = require('https');

const url =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmxhZGxlbnQiLCJhIjoiY2swZ3JheGtxMDlzMDNpbnF1anMxc2dqZiJ9.thn28gE6bR5ZbDx8_i7_UQ';

const request = https.request(url, response => {
  let data = '';

  response.on('data', chunk => {
    data += chunk.toString();
  });

  response.on('end', () => {
    console.log('data >>>>', JSON.parse(data));
  });
});

request.on('error', error => {
  console.log('error >>>>', error);
});

request.end();
