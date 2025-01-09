// backend/controllers/users.js

const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// User login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Utilisateur non trouvé." });

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Identifiants invalides." });

    // Génération ou récupération du token permanent
    let token = user.token;
    if (!token) {
      token = uuidv4(); // Générer un nouveau token s'il n'existe pas
      await pool.query("UPDATE users SET token = ? WHERE id = ?", [
        token,
        user.id,
      ]);
    }

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      role: user.role,
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Middleware d'authentification basé sur le token
const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Accès refusé. Token manquant." });

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE token = ?", [
      token,
    ]);

    if (rows.length === 0)
      return res.status(401).json({ message: "Token invalide." });

    req.user = rows[0];
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Suppression d'un utilisateur par ID
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser, authenticateToken, deleteUser };
