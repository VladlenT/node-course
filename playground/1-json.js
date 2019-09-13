const fs = require('fs');

const data = fs.readFileSync('1-json.json').toString();
const parsedData = JSON.parse(data);

parsedData.name = 'Vladlen';
parsedData.age = 23;

fs.writeFileSync('1-json.json', JSON.stringify(parsedData));
