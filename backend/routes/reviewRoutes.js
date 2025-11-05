const express = require('express');
const router = express.Router();
const { create, findByMovieId, update, remove } = require('../models/reviewModel');

// Add review
router.post('/', (req, res) => {
  const review = req.body;
  create(review, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Review added' });
  });
});

// Get all reviews for a movie
router.get('/movie/:movie_id', (req, res) => {
  findByMovieId(req.params.movie_id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update review
router.put('/:id', (req, res) => {
  update(req.params.id, req.body, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Review updated' });
  });
});

// Delete review
router.delete('/:id', (req, res) => {
  remove(req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Review deleted' });
  });
});

module.exports = router;