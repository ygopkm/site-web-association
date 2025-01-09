// backend/controllers/votes.js

const pool = require("../config/db");

// Add a vote
const addVote = async (req, res) => {
  const { vote_option, proposalId } = req.body;
  const userId = req.user.id; // Identification de l'utilisateur authentifié

  if (!vote_option || !proposalId) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  if (!["yes", "no"].includes(vote_option)) {
    return res.status(400).json({ message: "Option de vote invalide." });
  }

  try {
    // Vérifier si l'utilisateur a déjà voté pour cette proposition
    const [existingVote] = await pool.query(
      "SELECT * FROM votes WHERE user_id = ? AND proposal_id = ?",
      [userId, proposalId]
    );

    if (existingVote.length > 0) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà voté pour cette proposition." });
    }

    await pool.query(
      "INSERT INTO votes (vote_option, user_id, proposal_id) VALUES (?, ?, ?)",
      [vote_option, userId, proposalId]
    );
    res.status(201).json({ message: "Vote ajouté avec succès." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get votes summary
const getVotes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id as proposalId, p.title, 
              SUM(CASE WHEN v.vote_option = 'yes' THEN 1 ELSE 0 END) as yes,
              SUM(CASE WHEN v.vote_option = 'no' THEN 1 ELSE 0 END) as no
       FROM proposals p
       LEFT JOIN votes v ON p.id = v.proposal_id
       GROUP BY p.id, p.title`
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addVote, getVotes };
