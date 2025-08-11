// generateStockData.js
const fs = require('fs');
const path = require('path');
const { generateFullDataset } = require('./utils/generator');

const outDir = path.join(__dirname, 'data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const stockData = generateFullDataset();
fs.writeFileSync(path.join(outDir, 'stocks.json'), JSON.stringify(stockData, null, 2));
console.log(' Stock data generated successfully in data/stocks.json');
