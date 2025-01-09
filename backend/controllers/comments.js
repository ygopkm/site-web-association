// backend/controllers/comments.js

const pool = require("../config/db");

// Get all comments for a specific news
const getCommentsByNews = async (req, res) => {
  const { newsId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT comments.id, comments.content, comments.created_at, users.username 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE comments.news_id = ? 
       ORDER BY comments.created_at DESC`,
      [newsId]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment
const addComment = async (req, res) => {
  const { content, newsId } = req.body;
  const userId = req.user.id; // Identification de l'utilisateur authentifié

  if (!content || !newsId) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    await pool.query(
      "INSERT INTO comments (content, user_id, news_id) VALUES (?, ?, ?)",
      [content, userId, newsId]
    );
    res.status(201).json({ message: "Commentaire ajouté avec succès." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCommentsByNews, addComment };
