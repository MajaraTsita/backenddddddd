const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Search movies
router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query }
    });
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from TMDb' });
  }
});

// Get movie details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Movie not found' });
  }
});

module.exports = router;