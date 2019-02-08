const fs = require('fs');
const path = require('path');

const obj = {
  "key": "loginCount",
  "user": "270eff5b-065e-4642-8ccb-073112d69927",
  "operation": "increment",
  "data": null
};

const list = [];

for (var i = 0; i < 1000; i++) {
  list.push(obj);
}

const out = JSON.stringify(list);
const filePath = path.join(__dirname, '../../', 'sample', 'input-1k.json');

fs.writeFileSync(filePath, out, 'utf8');
console.log(`Output written to ${filePath}.`);