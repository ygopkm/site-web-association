// backend/routes/news.js

const express = require("express");
const { getAllNews, createNews } = require("../controllers/news");
const { authenticateToken, authorizeRole } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllNews); // Fetch all news
router.post("/", authenticateToken, authorizeRole("admin"), createNews); // Admin crée une actualité

module.exports = router;
