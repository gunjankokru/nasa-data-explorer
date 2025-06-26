const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
//const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 8080;
const NASA_API_KEY = process.env.NASA_API_KEY;

app.use(cors());

app.get('/api/apod', async (req, res) => {
    const { date } = req.query;
  
    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}`;
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.error('❌ NASA API fetch error:', error.message);
      res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
