// backend/models/reviewModel.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database file
const dbPath = path.join(__dirname, '../database/db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

const create = (review, callback) => {
  const { movie_id, user_name, rating, comment } = review;
  const sql = `INSERT INTO reviews (movie_id, user_name, rating, comment) VALUES (?, ?, ?, ?)`;
  db.run(sql, [movie_id, user_name, rating, comment], callback);
};

const findByMovieId = (movie_id, callback) => {
  const sql = `SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at DESC`;
  db.all(sql, [movie_id], callback);
};

const update = (id, updates, callback) => {
  const { rating, comment } = updates;
  const sql = `UPDATE reviews SET rating = ?, comment = ?, created_at = CURRENT_TIMESTAMP WHERE id = ?`;
  db.run(sql, [rating, comment, id], callback);
};

const remove = (id, callback) => {
  const sql = `DELETE FROM reviews WHERE id = ?`;
  db.run(sql, [id], callback);
};

module.exports = { create, findByMovieId, update, remove };