const express = require('express');
const cors = require('cors');
const path = require('path');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', stockRoutes);

// simple health
app.get('/', (req, res) => res.send('Stock Dashboard Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
