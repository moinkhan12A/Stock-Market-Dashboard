const express = require('express');
const fs = require('fs');
const path = require('path');
const SimpleLinearRegression = require('ml-regression').SimpleLinearRegression;



const router = express.Router();
const dataPath = path.join(__dirname, '..', 'data', 'stocks.json');

function loadData() {
  if (!fs.existsSync(dataPath)) {
    return { companies: [] };
  }
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

router.get('/stock/:symbol/predict', (req, res) => {
    try {
        const data = loadData();
        
        const stock = data.companies.find(s => s.symbol === req.params.symbol);

        if (!stock || !stock.prices || stock.prices.length < 10) {
            return res.status(404).json({ message: "Not enough data for prediction." });
        }
        
        // 1. Prepare data for the model
        const x_time = []; // Time (0, 1, 2...)
        const y_price = []; // Closing price

        stock.prices.forEach((priceData, index) => {
            x_time.push(index);
            y_price.push(priceData.close);
        });
        
        // 2. Train the model
        const regression = new SimpleLinearRegression(x_time, y_price);
        
        // 3. Predict the next day's price
        const prediction = regression.predict(x_time.length);
        
        res.json({ prediction: prediction.toFixed(2) });

    } catch (error) {
        console.error("PREDICTION FAILED:", error); // Added for better debugging
        res.status(500).json({ message: "Error calculating prediction." });
    }
});

// GET /api/companies
router.get('/companies', (req, res) => {
  const data = loadData();
  const companies = data.companies.map(c => ({ symbol: c.symbol, name: c.name }));
  res.json(companies);
});

// GET /api/stock/:symbol  -> returns array of prices
router.get('/stock/:symbol', (req, res) => {
  const sym = req.params.symbol.toUpperCase();
  const data = loadData();
  const company = data.companies.find(c => c.symbol.toUpperCase() === sym);
  if (!company) return res.status(404).json({ message: 'Company not found' });
  res.json({ symbol: company.symbol, name: company.name, prices: company.prices });
});

// GET /api/stock/:symbol/summary  -> 52-week high/low & avg volume
router.get('/stock/:symbol/summary', (req, res) => {
  const sym = req.params.symbol.toUpperCase();
  const data = loadData();
  const company = data.companies.find(c => c.symbol.toUpperCase() === sym);
  if (!company) return res.status(404).json({ message: 'Company not found' });

  const prices = company.prices;
  const high = Math.max(...prices.map(p => p.high));
  const low = Math.min(...prices.map(p => p.low));
  const avgVolume = Math.round(prices.reduce((s, p) => s + p.volume, 0) / prices.length);

  // extra: compute simple moving average (last 20 days) - optional
  const last20 = prices.slice(-20).map(p => p.close);
  const sma20 = last20.length ? +(last20.reduce((a,b)=>a+b,0)/last20.length).toFixed(2) : null;

  res.json({ symbol: company.symbol, name: company.name, high, low, avgVolume, sma20 });
});


module.exports = router;
