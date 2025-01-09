// backend/routes/users.js

const express = require("express");
const { authenticateToken, authorizeRole } = require("../middlewares/auth");
const { loginUser, deleteUser } = require("../controllers/users");

const router = express.Router();

router.post("/login", loginUser); // User login

// Route pour récupérer les informations de l'utilisateur connecté (admin uniquement)
router.get("/", authenticateToken, authorizeRole("admin"), async (req, res) => {
  res.json({ message: "Accès autorisé", user: req.user });
});

// Route pour supprimer un utilisateur par ID (admin uniquement)
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteUser);

module.exports = router;
