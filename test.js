const fs = import('fs');
const yaml = require('js-yaml');

const data = fs.readFileSync('./public/yaml/_config.yaml')
const rou_configs = yaml.load(data)

console.log(rou_configs)