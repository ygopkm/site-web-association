// backend/controllers/news.js

const pool = require("../config/db");

// Fetch all news
const getAllNews = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM news ORDER BY created_at DESC"
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a news
const createNews = async (req, res) => {
  const { title, content, image_url } = req.body;

  try {
    await pool.query(
      "INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)",
      [title, content, image_url]
    );
    res.status(201).json({ message: "Actualité créée avec succès." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllNews, createNews };
