// utils/generator.js
// Generates 1 year (365 days) of mock realistic stock data for 10 companies.

function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function generatePrices(basePrice) {
  const prices = [];
  const days = 365;
  const start = new Date();
  start.setDate(start.getDate() - days + 1); // include today - (days-1)

  let prevClose = +(basePrice + randBetween(-0.02, 0.02) * basePrice).toFixed(2);

  for (let i = 0; i < days; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    const date = current.toISOString().split('T')[0];

    // small daily drift and volatility
    const open = +(prevClose + randBetween(-0.01, 0.01) * prevClose).toFixed(2);
    const close = +(open + randBetween(-0.02, 0.02) * prevClose).toFixed(2);

    const high = +Math.max(open, close) + +(Math.abs(randBetween(0, 0.01) * prevClose)).toFixed(2);
    const low = +Math.min(open, close) - +(Math.abs(randBetween(0, 0.01) * prevClose)).toFixed(2);

    // volume scaled to company size
    const baseVol = Math.round(randBetween(500000, 2500000));
    const volume = baseVol;

    prices.push({
      date,
      open: Number(open.toFixed(2)),
      close: Number(close.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      volume
    });

    prevClose = close;
  }
  return prices;
}

function generateFullDataset() {
  const companies = [
    { symbol: 'TCS', name: 'Tata Consultancy Services', basePrice: 3500 },
    { symbol: 'INFY', name: 'Infosys', basePrice: 1450 },
    { symbol: 'RELIANCE', name: 'Reliance Industries', basePrice: 2500 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', basePrice: 1600 },
    { symbol: 'SBIN', name: 'State Bank of India', basePrice: 550 },
    { symbol: 'ITC', name: 'ITC Limited', basePrice: 450 },
    { symbol: 'ADANIGREEN', name: 'Adani Green Energy', basePrice: 950 },
    { symbol: 'MARUTI', name: 'Maruti Suzuki', basePrice: 9000 },
    { symbol: 'WIPRO', name: 'Wipro', basePrice: 400 },
    { symbol: 'ONGC', name: 'Oil and Natural Gas Corporation', basePrice: 200 }
  ];

  return {
    companies: companies.map(c => ({
      symbol: c.symbol,
      name: c.name,
      prices: generatePrices(c.basePrice)
    }))
  };
}

module.exports = { generateFullDataset };
